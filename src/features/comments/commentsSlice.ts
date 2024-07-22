import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (payload: Omit<Comment, 'id'>) => {
    const newComment = await createComment(payload);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
  comments: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  visible: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setCommentsVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          ({ id }) => id !== action.payload,
        );
      });
  },
});

export const { setCommentsError, setCommentsVisible } = commentsSlice.actions;
export default commentsSlice.reducer;
