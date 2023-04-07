/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type ComentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: ComentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComents = createAsyncThunk('comments/load', getPostComments);

export const addNewComents = createAsyncThunk('comments/add', createComment);

export const deleteComents = createAsyncThunk('comments/delete', deleteComment);

export const comentsSlice = createSlice({
  name: 'coments',
  initialState,
  reducers: {
    delete: (state, action) => {
      state.items = state.items.filter(
        coment => coment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComents.pending, (state => {
      state.loaded = false;
    }));

    builder.addCase(loadComents.fulfilled,
      ((state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      }));

    builder.addCase(loadComents.rejected, ((state) => {
      state.hasError = true;
      state.loaded = true;
    }));

    builder.addCase(addNewComents.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      });

    builder.addCase(addNewComents.rejected, ((state) => {
      state.hasError = true;
    }));

    builder.addCase(deleteComents.rejected, ((state) => {
      state.hasError = true;
    }));
  },
});

export const { actions } = comentsSlice;
export default comentsSlice.reducer;
