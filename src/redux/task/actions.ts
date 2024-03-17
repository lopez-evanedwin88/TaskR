export const TASKS_REQUEST = 'TASKS_REQUEST';
export const TASKS_SUCCESS = 'TASKS_SUCCESS';
export const TASKS_FAILURE = 'TASKS_FAILURE';

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
