import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  'form': formReducer
});

export default rootReducer;
