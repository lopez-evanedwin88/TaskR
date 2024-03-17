import { AuthState } from './login/authReducer'; // Import AuthState from your authReducer
import { TaskState } from './task/taskReducer';
import { TaskRecord } from './taskRecord/taskRecordReducer';

// Define RootState interface to represent the overall state of your application
export interface RootState {
  auth: AuthState; // Include states from other reducers as needed
  task: TaskState;
  taskRecord: TaskRecord;
}