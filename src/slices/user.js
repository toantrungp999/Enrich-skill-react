import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { AUTH_STATUS, LOADING_STATUS } from 'constants/apis';

export const ROOT_STATE_NAME = 'user';
const initialState = {
  authenticated: AUTH_STATUS.IDLE,
  loginStatus: {
    data: null,
    status: LOADING_STATUS.IDLE,
    error: null,
  },
  userInfo: {
    data: null,
    status: LOADING_STATUS.IDLE,
    error: null,
  },
};

const userSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.authenticated = action.payload;
    },
    getUserInfoRequest(state) {
      state.userInfo.status = LOADING_STATUS.LOADING;
    },
    getUserInfoSuccess(state, action) {
      state.userInfo.data = action.payload;
      state.userInfo.status = LOADING_STATUS.SUCCEEDED;
    },
    getUserInfoFailure(state, action) {
      state.userInfo.status = LOADING_STATUS.FAILED;
      state.userInfo.data = {};
      state.userInfo.error = action.payload;
    },
    logoutRequest(state) {
      state.userInfo.data = {};
      state.authenticated = AUTH_STATUS.LOGOUT;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Export the reducer, either as a default or named export
export default reducer;
// Extract and export each action creator by name
export const {
  setAuthenticated,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  logoutRequest,
} = actions;
// Create and export each selector create by name
export const rootSelector = state => state[ROOT_STATE_NAME] || {};
export const authenticatedSelector = createSelector(
  rootSelector,
  ({ authenticated }) => authenticated,
);
export const userInfoSelector = createSelector(
  rootSelector,
  ({ userInfo }) => userInfo,
);
