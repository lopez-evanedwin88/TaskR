import { combineReducers } from 'redux';
import authReducer from './login/authReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if any
});

export default rootReducer;