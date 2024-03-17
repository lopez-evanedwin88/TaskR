export const TASK_RECORDS_REQUEST = 'TASK_RECORDS_REQUEST';
export const TASK_RECORDS_SUCCESS = 'TASK_RECORDS_SUCCESS';
export const TASK_RECORDS_FAILURE = 'TASK_RECORDS_FAILURE';

export const taskRecordsRequest = (userId: number) => ({
  type: TASK_RECORDS_REQUEST,
  payload: {userId},
});

export const taskRecordsSuccess = (tasks: any) => ({
  type: TASK_RECORDS_SUCCESS,
  payload: tasks,
});

export const taskRecordsFailure = (error: string) => ({
  type: TASK_RECORDS_FAILURE,
  payload: error,
});
