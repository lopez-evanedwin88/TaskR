import { all } from 'redux-saga/effects';
import { watchLogin } from './login/sagas';

export default function* rootSaga() {
  yield all([
   watchLogin(),
    // Add other sagas here if any
  ]);
}