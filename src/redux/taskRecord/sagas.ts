import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TASK_RECORDS_REQUEST, taskRecordsSuccess, taskRecordsFailure } from './actions';
import { BASE_URL } from '../../constants/Base';

function* taskRecords(action: any):any {
  const user = yield select((state) => state.auth.user);

  try {
    const response = yield call(fetch, `${BASE_URL}/task_record/${action.payload.task_id}`, {
      method: 'GET',
      headers: {
        'Authorization': user.token,
      }
    });

    if (!response.ok) {
      throw new Error('Retrieving tasks failed');
    }

    const {data} = yield response.json();
    yield put(taskRecordsSuccess({taskRecords: data}));
  } catch (error) {
    yield put(taskRecordsFailure((error as any).message));
  }
}

export function* watchTaskRecords() {
  yield takeLatest(TASK_RECORDS_REQUEST, taskRecords);
}