import { all } from 'redux-saga/effects';
import { watchLogin } from './login/sagas';
import { watchInsertTask, watchTasks, watchUpdateTaskStatus } from './task/sagas';
import { watchInsertTaskRecord, watchTaskRecords } from './taskRecord/sagas';

export default function* rootSaga() {
  yield all([
   watchLogin(),
   watchTasks(),
   watchTaskRecords(),
   watchInsertTaskRecord(),
   watchInsertTask(),
   watchUpdateTaskStatus(),
  ]);
}