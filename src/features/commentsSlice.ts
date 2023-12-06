import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    },
    addNewComment: (state, action: PayloadAction<Comment>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const {
  setComments,
  addNewComment,
  removeComment,
  setLoaded,
  setHasError,
} = commentsSlice.actions;
export default commentsSlice.reducer;
