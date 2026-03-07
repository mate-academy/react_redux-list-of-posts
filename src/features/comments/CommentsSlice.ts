import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      // eslint-disable-next-line no-param-reassign
      state.items.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const { setComments, addComment, deleteComment, setLoaded, setError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
