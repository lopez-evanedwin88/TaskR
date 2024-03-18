import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './actions';
import { BASE_URL } from '../../constants/Base';

function* login(action: any):any {
  try {
    const formData = new FormData();
    formData.append('staff_id', action.payload.staff_id);
    formData.append('password', action.payload.password);

    const response = yield call(fetch, `${BASE_URL}/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const user = yield response.json();
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure((error as any).message));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}