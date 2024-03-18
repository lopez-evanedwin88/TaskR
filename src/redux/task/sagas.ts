import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TASKS_REQUEST, tasksSuccess, tasksFailure, insertTaskRequest, insertTaskFailure, INSERT_TASK_REQUEST, insertTaskSuccess } from './actions';
import { BASE_URL } from '../../constants/Base';
import { createFormData } from '../../util/util';

function* tasks(action: any):any {
  const user = yield select((state) => state.auth.user);

  try {
    const response = yield call(fetch, `${BASE_URL}/task/${action.payload.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': user.token,
      }
    });

    if (!response.ok) {
      throw new Error('Retrieving tasks failed');
    }

    const {data} = yield response.json();
    yield put(tasksSuccess({tasks: data}));
  } catch (error) {
    yield put(tasksFailure((error as any).message));
  }
}

function* insertTask(action: any):any {
  const user = yield select((state) => state.auth.user);
  const task = action.payload;
  const photo = action.payload.photo;

  const newFormData = createFormData(photo);
  
  const taskFormData = new FormData();
  taskFormData.append('client_id', task.client_id);
  taskFormData.append('start_date', task.start_date);
  taskFormData.append('due_date', task.due_date);
  taskFormData.append('title', task.title);
  taskFormData.append('description', task.description);
  taskFormData.append('status', 'Pending');
  taskFormData.append('message', task.description);

  try {
    const callUpload = yield call(fetch, `${BASE_URL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: user.token,
      },
      body: newFormData,
    });

    if (!callUpload.ok) {
      throw new Error('Uploading image failed');
    }

    const responseImage = yield callUpload.json();
    console.log('response', responseImage);

    if (responseImage.status) {
      taskFormData.append('image_url', responseImage.data.url);
    }

    const callResponse = yield call(fetch, `${BASE_URL}/task/create`, {
      method: 'POST',
      headers: {
        'Authorization': user.token,
      },
      body: taskFormData
    });

    if (!callResponse.ok) {
      console.log('wewski', callResponse);
      throw new Error('Creating new task failed');
    }

    const {status, response} = yield callResponse.json();
    yield put(insertTaskSuccess({status: status, response: response}));
  } catch (error) {
    yield put(insertTaskFailure((error as any).message));
  }
}

export function* watchTasks() {
  yield takeLatest(TASKS_REQUEST, tasks);
}

export function* watchInsertTask() {
  yield takeLatest(INSERT_TASK_REQUEST, insertTask);
}