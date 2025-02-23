import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

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

export const { reducer, actions } = createSlice({
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
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchComments.rejected, state => {
        return { ...state, hasError: true, loaded: true };
      });

    builder
      .addCase(addComment.fulfilled, (state, action) => {
        return { ...state, items: [...state.items, action.payload] };
      })
      .addCase(addComment.rejected, state => {
        return { ...state, hasError: true };
      });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    });
  },
});

export const commentsSelector = (state: RootState) => state.comments;
