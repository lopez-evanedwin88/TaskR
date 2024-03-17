export const TASK_RECORDS_REQUEST = 'TASK_RECORDS_REQUEST';
export const TASK_RECORDS_SUCCESS = 'TASK_RECORDS_SUCCESS';
export const TASK_RECORDS_FAILURE = 'TASK_RECORDS_FAILURE';

export const INSERT_TASK_RECORD_REQUEST = 'INSERT_TASK_RECORD_REQUEST';
export const INSERT_TASK_RECORD_SUCCESS = 'INSERT_TASK_RECORD_SUCCESS';
export const INSERT_TASK_RECORD_FAILURE = 'INSERT_TASK_RECORD_FAILURE';

export const taskRecordsRequest = (task_id: number) => ({
  type: TASK_RECORDS_REQUEST,
  payload: {task_id},
});

export const taskRecordsSuccess = (tasks: any) => ({
  type: TASK_RECORDS_SUCCESS,
  payload: tasks,
});

export const taskRecordsFailure = (error: string) => ({
  type: TASK_RECORDS_FAILURE,
  payload: error,
});

export const insertTaskRecordRequest = (taskRecord: any) => ({
  type: INSERT_TASK_RECORD_REQUEST,
  payload: taskRecord,
});

export const insertTaskRecordSuccess = (response: any) => ({
  type: INSERT_TASK_RECORD_SUCCESS,
  payload: response,
});

export const insertTaskRecordFailure = (error: string) => ({
  type: INSERT_TASK_RECORD_FAILURE,
  payload: error,
});
