import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  visible: boolean;
  items: Comment[];
  hasError: string;
}

const initialState: CommentsState = {
  loaded: true,
  visible: true,
  items: [] as Comment[],
  hasError: '',
};

export const setCommentsAsync = createAsyncThunk(
  'Comments/fetch',
  (postId: Comment['postId'] | null) => {
    if (postId === null) {
      return;
    }

    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      return { ...state, visible: action.payload };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(item => item.id != action.payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(setCommentsAsync.pending, state => {
      return { ...state, hasError: '', loaded: false, visible: false };
    });
    builder.addCase(setCommentsAsync.fulfilled, (state, action) => {
      return { ...state, items: action.payload ?? [], loaded: true };
    });
    builder.addCase(setCommentsAsync.rejected, (state, action) => {
      return {
        ...state,
        hasError: action.error.message || '',
        loaded: true,
      };
    });
  },
});

export const { setVisible, deleteComment, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
