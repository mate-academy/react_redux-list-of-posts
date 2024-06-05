/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export type InitialStateType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchComments: (state, action: PayloadAction<Comment[] | []>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export default commentsSlice.reducer;
export const {
  fetchComments,
  setLoading,
  setError,
  addComment,
  deleteComment,
} = commentsSlice.actions;
