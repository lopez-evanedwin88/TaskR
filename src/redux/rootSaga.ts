import { all } from 'redux-saga/effects';
import { watchLogin } from './login/sagas';
import { watchTasks } from './task/sagas';
import { watchTaskRecords } from './taskRecord/sagas';

export default function* rootSaga() {
  yield all([
   watchLogin(),
   watchTasks(),
   watchTaskRecords(),
  ]);
}