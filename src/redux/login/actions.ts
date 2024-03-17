
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    staff_id: string;
    password: string;
  };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    user: any; // Define your user type
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

export const loginRequest = (staff_id: string, password: string): AuthActionTypes => ({
  type: LOGIN_REQUEST,
  payload: { staff_id, password },
});