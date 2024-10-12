import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk<Comment[], Post['id']>(
  'comments/fetch',
  postId => getPostComments(postId),
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  comment => createComment(comment),
);

export const removeComment = createAsyncThunk<number, Comment['id']>(
  'comments/remove',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          comments: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchComments.rejected, state => {
        return { ...state, hasError: true, loaded: true };
      });

    builder
      .addCase(addComment.fulfilled, (state, action) => {
        return { ...state, comments: [...state.comments, action.payload] };
      })
      .addCase(addComment.rejected, state => {
        return { ...state, hasError: true };
      });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    });
  },
});
