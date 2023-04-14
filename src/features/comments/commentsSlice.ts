/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk } from '../../app/store';

type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialCommentsState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
});
