import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentState {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    loadComments: (state, action: PayloadAction<Comment[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      const filteredComments = state.comments.filter(
        item => item.id !== action.payload,
      );

      // eslint-disable-next-line no-param-reassign
      state.comments = filteredComments;
    },
  },
});

export const { actions } = commentsSlice;

export default commentsSlice.reducer;
