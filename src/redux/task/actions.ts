export const TASKS_REQUEST = 'TASKS_REQUEST';
export const TASKS_SUCCESS = 'TASKS_SUCCESS';
export const TASKS_FAILURE = 'TASKS_FAILURE';

export const INSERT_TASK_REQUEST = 'INSERT_TASK_REQUEST';
export const INSERT_TASK_SUCCESS = 'INSERT_TASK_SUCCESS';
export const INSERT_TASK_FAILURE = 'INSERT_TASK_FAILURE';

export const CLEAR_RESPONSE = 'CLEAR_RESPONSE_STATE';

export const tasksRequest = (userId: number) => ({
  type: TASKS_REQUEST,
  payload: {userId},
});

export const tasksSuccess = (tasks: any) => ({
  type: TASKS_SUCCESS,
  payload: tasks,
});

export const tasksFailure = (error: string) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const insertTaskRequest = (task: any) => ({
  type: INSERT_TASK_REQUEST,
  payload: task,
});

export const insertTaskSuccess = (response: any) => ({
  type: INSERT_TASK_SUCCESS,
  payload: response,
});

export const insertTaskFailure = (error: string) => ({
  type: INSERT_TASK_FAILURE,
  payload: error,
});

export const clearResponse = () => ({
  type: CLEAR_RESPONSE,
});

export const setInitialState = () => ({
  type: '',
});
