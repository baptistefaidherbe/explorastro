import { combineReducers } from 'redux';

import explorationReducer from './exploration';
import userReducer from './user';
import messageReducer from './message';

const rootReducer = combineReducers({
  exploration: explorationReducer,
  user: userReducer,
  message: messageReducer,
});

export default rootReducer;
