/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

// eslint-disable-next-line max-len
export const fetchPosts = createAsyncThunk('users/fetchPosts', async (id: number, thunkAPI) => {
  try {
    return await getUserPosts(id);
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue('something went wrong');
  }
});

type InitialState = {
  posts: Post[] | null;
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  posts: null,
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
        state.error = 'null';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.error = 'null';
        state.posts = [...action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'error';
        }

        state.status = 'failed';
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
