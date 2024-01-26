import { combineReducers } from 'redux';

// import all reducer
import authReducer from './auth';
import threadReducer from './thread';

// combine all reducer
const reducers = combineReducers({
  auth: authReducer,
  thread: threadReducer,
});

export default reducers;
