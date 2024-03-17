import { TASK_RECORDS_REQUEST, TASK_RECORDS_SUCCESS, TASK_RECORDS_FAILURE } from './actions';

export interface TaskRecord {
  taskRecords: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskRecord = {
  taskRecords: null,
  loading: false,
  error: null,
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
    default:
      return state;
  }
};

export default taskRecordReducer;