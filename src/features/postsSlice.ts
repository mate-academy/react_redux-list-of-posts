import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  value: Post[];
  isLoading: boolean;
  errorText: boolean;
};

const initialState: InitialState = {
  value: [],
  isLoading: false,
  errorText: false,
};

export const fetchPosts = createAsyncThunk('fetch/posts', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      return { ...state, value: [] };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return { ...state, isLoading: true, errorText: false };
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return { ...state, value: action.payload, isLoading: false };
      },
    );
    builder.addCase(fetchPosts.rejected, state => {
      return { ...state, errorText: true, isLoading: false };
    });
  },
});

export default postsSlice.reducer;
export const { resetPosts } = postsSlice.actions;
