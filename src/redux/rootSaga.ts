import { all } from 'redux-saga/effects';
import { watchLogin } from './login/sagas';
import { watchTasks } from './task/sagas';

export default function* rootSaga() {
  yield all([
   watchLogin(),
   watchTasks(),
    // Add other sagas here if any
  ]);
}