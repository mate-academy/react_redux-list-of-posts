import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsStatus = (state: RootState) => state.comments.status;

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (
    { name, email, body, postId }: CommentData & { postId: number },
    { rejectWithValue },
  ) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId,
      });

      return newComment;
    } catch (error) {
      return rejectWithValue('Failed to create comment');
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  comments: Comment[];
  status: 'loaded' | 'hasError' | 'items';
  error: string | null;
}

export const initialState: CommentsState = {
  comments: [],
  status: 'items',
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, state => {
        return {
          ...state,
          status: 'items',
        };
      })
      .addCase(fetchCommentsByPostId.rejected, state => {
        return {
          ...state,
          status: 'hasError',
        };
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'loaded',
          comments: action.payload,
        };
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload as string,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments.filter(
            comment => action.payload !== comment.id,
          ),
        };
      });
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
