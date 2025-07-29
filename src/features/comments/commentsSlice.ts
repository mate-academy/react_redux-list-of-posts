import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
    setCommentsLoading: (state) => {
      state.loaded = false;
      state.hasError = false;
    },
    // eslint-disable-next-line no-param-reassign
    setCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    },
    // eslint-disable-next-line no-param-reassign
    setCommentsError: (state) => {
      state.loaded = true;
      state.hasError = true;
      state.items = [];
    },
    // eslint-disable-next-line no-param-reassign
    clearComments: (state) => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    },
    // eslint-disable-next-line no-param-reassign
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
  },
});

export const {
  setCommentsLoading,
  setCommentsSuccess,
  setCommentsError,
  clearComments,
  addComment
} = commentsSlice.actions;
export default commentsSlice.reducer;
export type { CommentsState };
