import { combineReducers } from 'redux'
import user from './user';
import system from './system'
const reducers = combineReducers({
  user, system
});

export default reducers
