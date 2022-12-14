import { combineReducers } from 'redux';
import auth from './auth.reducer';
import layout from './layout.reducer';

export default combineReducers({ auth, layout });
