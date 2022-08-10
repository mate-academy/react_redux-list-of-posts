/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk, AnyAction,
} from '@reduxjs/toolkit';
import { BASE_URL } from '../api/api';

export const fetchAllUsersPosts = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
  'posts/fetchAllUsersPosts',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/posts`);
    //

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  },
);

export const fetchUserPostById = createAsyncThunk<Post[], User['id'], { rejectValue: string }>(
  'posts/fetchUserPostById',
  async (userId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}//posts?userId=${userId}`);
    //

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  },
);

export const deletePost = createAsyncThunk<Post['id'], Post['id'], { rejectValue: string }>(
  'postDetails/deletePost',
  async (postId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t delete post. Server error.');
    }

    return postId;
  },
);

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

type PostState = {
  posts: Post[],
  selectedPostId: Post['id'],
  loading: boolean;
  error: string | null
};

const initialState: PostState = {
  posts: [],
  selectedPostId: 0,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getSelectPostId(state, action: PayloadAction<Post['id']>) {
      state.selectedPostId = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPostById.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { getSelectPostId } = postsSlice.actions;

export default postsSlice.reducer;
