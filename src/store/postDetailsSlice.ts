/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk, AnyAction,
} from '@reduxjs/toolkit';
import { BASE_URL } from '../api/api';

export const fetchPostDetailsByPostId = createAsyncThunk<Post, Post['id'], { rejectValue: string }>(
  'postDetails/fetchPostDetailsByPostId',
  async (postId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  },
);

export const fetchComentsByPostId = createAsyncThunk<any, Post['id'], { rejectValue: string }>(
  'postDetails/fetchComentsByPostId',
  async (postId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  },
);

export const deletePostComments = createAsyncThunk<Comment['id'], Comment['id'], { rejectValue: string }>(
  'postDetails/deletePostComments',
  async (commentId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t delete task. Server error.');
    }

    return commentId;
  },
);

export const addPostComment = createAsyncThunk<Comment, NewComment, { rejectValue: string }>(
  'todos/addNewTodo',
  async (newComment, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add task. Server error.');
    }

    return (await response.json()) as Comment;
  },
);

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

type PostDetails = {
  commentsOfPost: Comment[],
  postDetails: Post | null,
  loading: boolean;
  error: string | null
};

const initialState: PostDetails = {
  commentsOfPost: [],
  postDetails: null,
  loading: false,
  error: null,
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetailsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetailsByPostId.fulfilled, (state, action) => {
        state.postDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchComentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComentsByPostId.fulfilled, (state, action) => {
        state.commentsOfPost = action.payload;
        state.loading = false;
      })
      .addCase(deletePostComments.fulfilled, (state, action) => {
        state.commentsOfPost = state.commentsOfPost.filter(comment => comment.id !== action.payload);
      })
      .addMatcher(isError, (state, action:PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default postDetailsSlice.reducer;
