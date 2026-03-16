import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPostComments } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const setCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    pushComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(setCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        setCommentsAsync.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addCase(setCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { pushComment, removeComment, clearComments, setError } =
  commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoader = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
