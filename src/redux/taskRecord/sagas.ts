import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  TASK_RECORDS_REQUEST,
  taskRecordsSuccess,
  taskRecordsFailure,
  insertTaskRecordSuccess,
  insertTaskRecordFailure,
  INSERT_TASK_RECORD_REQUEST,
} from './actions';
import {BASE_URL} from '../../constants/Base';
import {Platform} from 'react-native';

function* taskRecords(action: any): any {
  const user = yield select(state => state.auth.user);

  try {
    const response = yield call(
      fetch,
      `${BASE_URL}/task_record/${parseInt(action.payload.task_id)}`,
      {
        method: 'GET',
        headers: {
          Authorization: user.token,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Retrieving tasks failed');
    }

    const {data} = yield response.json();
    yield put(taskRecordsSuccess({taskRecords: data}));
  } catch (error) {
    yield put(taskRecordsFailure((error as any).message));
  }
}

const createFormData = (photo: any, body:any = {}) => {
  const data = new FormData();

  const img = photo.assets[0];

  data.append('image', {
    name: img.fileName,
    type: img.type,
    uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

function* insertTaskRecord(action: any): any {
  const user = yield select(state => state.auth.user);

  const photo = action.payload.photo;

  const newFormData = createFormData(photo);
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
      const taskRecord = new FormData();
      taskRecord.append('message', action.payload.message);
      taskRecord.append('task_id', action.payload.task_id);
      taskRecord.append('image_url', responseImage.data.url);

      const callInsertRecord = yield call(
        fetch,
        `${BASE_URL}/task_record/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: user.token,
          },
          body: taskRecord,
        },
      );

      if (!callInsertRecord.ok) {
        throw new Error('Retrieving tasks failed');
      }

      const {status, response} = yield callInsertRecord.json();
      yield put(insertTaskRecordSuccess({status: status, response: response}));
    }
  } catch (error) {
    console.log('error', (error as any));
    yield put(insertTaskRecordFailure((error as any).message));
  }
}

export function* watchTaskRecords() {
  yield takeLatest(TASK_RECORDS_REQUEST, taskRecords);
}

export function* watchInsertTaskRecord() {
  yield takeLatest(INSERT_TASK_RECORD_REQUEST, insertTaskRecord);
}
