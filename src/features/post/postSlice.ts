import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload };
    },
    clear: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchPostsByUser.pending, state => ({
      ...state,
      loaded: true,
    }));
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: false,
    }));
    builder.addCase(fetchPostsByUser.rejected, state => ({
      ...state,
      hasError: true,
      loaded: false,
    }));
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
