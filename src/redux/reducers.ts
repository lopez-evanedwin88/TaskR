import { combineReducers } from 'redux';
import authReducer from './login/authReducer';
import taskReducer from './task/taskReducer';
import taskRecordReducer from './taskRecord/taskRecordReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  taskRecord: taskRecordReducer,
});

export default rootReducer;