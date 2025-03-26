/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type InitialStateProps = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialStateProps = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.hasError = action.error.message || 'Failed to fetch comments';
      state.loaded = false;
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
