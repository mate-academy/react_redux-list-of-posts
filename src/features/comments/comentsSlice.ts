import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { ErrorMessages } from '../../enums/ErrorMessages';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  error: string;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  error: '',
};

export const init = createAsyncThunk('fetch/comments', (selectedPost: Post) => {
  return getPostComments(selectedPost.id);
});

export const addToServer = createAsyncThunk('add/comment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  });

export const removeFromServer = createAsyncThunk('delete/comment',
  (comment: Comment) => {
    return deleteComment(comment.id);
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<Comment>) => {
      state.items
        = state.items.filter(comment => comment.id !== action.payload.id);
    },

    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (
      state,
      action: PayloadAction<Comment[]>,
    ) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.error = ErrorMessages.failDownloadComments;
    });

    builder.addCase(addToServer.fulfilled, (
      state,
      action: PayloadAction<Comment>,
    ) => {
      state.items.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(addToServer.rejected, (state) => {
      state.error = ErrorMessages.failToAddComment;
    });

    builder.addCase(removeFromServer.rejected, (state) => {
      state.error = ErrorMessages.failToDeleteComment;
    });
  },
});

export default commentsSlice.reducer;
export const { clear, removeComment } = commentsSlice.actions;
