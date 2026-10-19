import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return {
        ...state,
        items: [],
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(fetchPosts.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default postSlice.reducer;
export const { clearPosts } = postSlice.actions;
