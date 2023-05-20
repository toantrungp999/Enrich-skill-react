/**
 * @jest-environment jsdom
 */

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { GET_USER_INFO } from '../../constants/paths';

import { getData } from '../../services/api';

import userSaga, { getUserInfo } from '../userSaga';
import {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
} from '../../slices/user';

const provideDelay = ({ fn }, next) => (fn.name === 'delayP' ? null : next());

it('should watches userInfoSaga()', () => {
  testSaga(userSaga)
    .next()
    .takeEvery(getUserInfoRequest().type, getUserInfo)
    .finish()
    .isDone();
});

it('should watches getUserInfo() and dispatch the action getUserInfoSuccess()', () => {
  const mockDataUser = {
    data: {
      data: {
        email: 'toantrungp999@gmail.com',
      },
      isSuccess: true,
      statusCode: 200,
    },
  };

  return expectSaga(getUserInfo)
    .provide([
      [matchers.call.fn(getData, { url: GET_USER_INFO }), mockDataUser],
      { call: provideDelay },
    ])
    .put(getUserInfoSuccess(mockDataUser.data.data))
    .run();
});

it('should watches getUserInfo() and with Status code is different 200', () => {
  const mockDataUser = {
    data: {
      data: {},
      isSuccess: true,
      statusCode: 400,
    },
  };

  return expectSaga(getUserInfo)
    .provide([
      [matchers.call.fn(getData, { url: GET_USER_INFO }), mockDataUser],
      { call: provideDelay },
    ])
    .run();
});

it('should watches getUserInfo() and dispatch the action getUserInfoFailure()', () => {
  const error = new Error('Error');

  return expectSaga(getUserInfo)
    .provide([
      [matchers.call.fn(getData, { url: GET_USER_INFO }), throwError(error)],
    ])
    .put(getUserInfoFailure(error.message))
    .run();
});

it('should watches getUserInfo() and dispatch the action getUserInfoFailure(non-message)', () => {
  const error = new Error('Something went wrong!');

  return expectSaga(getUserInfo)
    .provide([
      [matchers.call.fn(getData, { url: GET_USER_INFO }), throwError({})],
    ])
    .put(getUserInfoFailure(error?.message))
    .run();
});
