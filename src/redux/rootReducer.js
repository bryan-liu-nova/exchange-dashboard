import { combineReducers } from 'redux';
import pairsReducer from './pairs/pairsReducer';

const rootReducer = combineReducers({
  pairs: pairsReducer,
});

export default rootReducer;
