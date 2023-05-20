/**
 * @jest-environment jsdom
 */

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import rootSaga from '../index';
import userSaga from '../userSaga';

it('should watches rootSaga()', () => {
  return expectSaga(rootSaga)
    .provide([[matchers.call(userSaga)]])
    .run();
});
