import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const ROOT_STATE_NAME = 'error';
const initialState = { error: {} };

const errorSilece = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = errorSilece;
export default reducer;
export const { setError } = actions;
export const rootSelector = state => state[ROOT_STATE_NAME] || {};
export const errorSelector = createSelector(rootSelector, ({ error }) => error);
