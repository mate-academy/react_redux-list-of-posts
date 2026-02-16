import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type PostComments = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const postComments: PostComments = {
  comments: [],
  loading: false,
  error: false,
};

export const loadComments = createAsyncThunk(
  'postComments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'postComments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const delComment = createAsyncThunk(
  'postComments/del',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: postComments,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      return {
        ...state,
        error: false,
        loading: true,
      };
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    });

    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      return {
        ...state,
        error: true,
      };
    });

    builder.addCase(delComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    });
  },
});
