import { call, put, takeEvery } from 'redux-saga/effects';

import { getData } from 'services/api';

import { GET_USER_INFO } from 'constants/paths';
import { ERROR_MESSAGE } from 'constants/message';

import {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
} from 'slices/user';

export function* getUserInfo() {
  try {
    const { data: result } = yield call(getData, {
      url: GET_USER_INFO,
    });

    const { isSuccess, statusCode, data } = result;

    if (isSuccess && statusCode === 200) {
      yield put(getUserInfoSuccess(data));
    }
  } catch (error) {
    const { message = ERROR_MESSAGE } = error;

    yield put(getUserInfoFailure(message));
  }
}

export default function* userSaga() {
  yield takeEvery(getUserInfoRequest().type, getUserInfo);
}
