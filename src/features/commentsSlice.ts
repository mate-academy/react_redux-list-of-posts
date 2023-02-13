/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentstState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
};

const initialState: CommentstState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
    addComment: (state, { payload }) => {
      state.comments.push(payload);
    },
    deleteComment: (state, { payload }) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== payload,
      );
    },
    setLoaded: (state, { payload }) => {
      state.loaded = payload;
    },
    setHasError: (state, { payload }) => {
      state.hasError = payload;
    },
    setVisible: (state, { payload }) => {
      state.visible = payload;
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
