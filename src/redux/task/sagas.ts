import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TASKS_REQUEST, tasksSuccess, tasksFailure } from './actions';
import { BASE_URL } from '../../constants/Base';

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

export function* watchTasks() {
  yield takeLatest(TASKS_REQUEST, tasks);
}