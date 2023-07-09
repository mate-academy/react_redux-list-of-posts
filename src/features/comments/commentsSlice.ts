import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

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
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    reset: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments
        .filter(item => item.id !== action.payload);
    },

    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },

    getComments: (state, action: PayloadAction<Comment[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const {
  addComment,
  reset,
  setError,
  setLoading,
  getComments,
} = commentsSlice.actions;
