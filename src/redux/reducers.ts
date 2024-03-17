import { combineReducers } from 'redux';
import authReducer from './login/authReducer';
import taskReducer from './task/taskReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  // Add other reducers here if any
});

export default rootReducer;