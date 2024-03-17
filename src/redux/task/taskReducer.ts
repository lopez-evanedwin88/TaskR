import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from './actions';

export interface TaskState {
  tasks: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: null,
  loading: false,
  error: null,
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
    default:
      return state;
  }
};

export default taskReducer;