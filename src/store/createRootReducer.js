import { combineReducers } from 'redux';

import errorReducer, { ROOT_STATE_NAME as ERROR } from '../slices/error';
import userReducer, { ROOT_STATE_NAME as USER } from '../slices/user';

export default function createRootReducer() {
  const rootReducer = combineReducers({
    [ERROR]: errorReducer,
    [USER]: userReducer,
  });

  return rootReducer;
}
