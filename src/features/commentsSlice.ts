import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
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

export const removeComment = createAsyncThunk<void, Comment['id']>(
  'comments/remove',
  commentId => {
    deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
        };
      })
      .addCase(fetchComments.rejected, state => {
        return { ...state, hasError: true };
      })
      .addCase(fetchComments.pending, state => {
        return { ...state, loaded: false };
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
        items: state.items.filter(comment => comment.id !== action.meta.arg),
      };
    });

    builder.addMatcher(fetchComments.settled, state => {
      return { ...state, loaded: true };
    });
  },
});

export default commentsSlice.reducer;

const comments = (state: RootState) => state.comments;

export const commentsSelector = createSelector([comments], value => value);

export const { actions } = commentsSlice;
