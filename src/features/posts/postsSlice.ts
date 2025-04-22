import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    return await getUserPosts(userId);
  },
);

type TypeInitialState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: TypeInitialState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => ({
      ...state,
      hasError: false,
      loaded: false,
    }));
    builder.addCase(fetchUserPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: action.payload,
    }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
