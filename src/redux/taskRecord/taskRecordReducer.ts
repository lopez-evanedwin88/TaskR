import {
  TASK_RECORDS_REQUEST,
  TASK_RECORDS_SUCCESS,
  TASK_RECORDS_FAILURE,
  INSERT_TASK_RECORD_REQUEST,
  INSERT_TASK_RECORD_SUCCESS,
  INSERT_TASK_RECORD_FAILURE,
} from './actions';

export interface TaskRecord {
  taskRecords: [] | null;
  loading: boolean;
  error: string | null;
  status: string | null;
  response: string | null;
}

const initialState: TaskRecord = {
  taskRecords: null,
  loading: false,
  error: null,
  status: null,
  response: null,
};

const taskRecordReducer = (state = initialState, action: any): TaskRecord => {
  switch (action.type) {
    case TASK_RECORDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TASK_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskRecords: action.payload.taskRecords,
      };
    case TASK_RECORDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INSERT_TASK_RECORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case INSERT_TASK_RECORD_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: null,
      };
    case INSERT_TASK_RECORD_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        response: action.payload.response,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskRecordReducer;
