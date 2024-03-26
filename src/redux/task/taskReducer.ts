import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  INSERT_TASK_SUCCESS,
  INSERT_TASK_REQUEST,
  INSERT_TASK_FAILURE,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  CLEAR_RESPONSE,
} from './actions';

export interface TaskState {
  tasks: [] | null;
  loading: boolean;
  error: string | null;
  status: any | null;
  response: string | null;
}

const initialState: TaskState = {
  tasks: null,
  loading: false,
  error: null,
  status: null,
  response: null,
};

const taskReducer = (state = initialState, action: any): TaskState => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
      };
    case TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INSERT_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case INSERT_TASK_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: null,
      };
    case INSERT_TASK_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TASK_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: null,
      };
    case UPDATE_TASK_STATUS_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: action.payload,
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        status: null,
        response: null,
      };
    default:
      return state;
  }
};

export default taskReducer;
