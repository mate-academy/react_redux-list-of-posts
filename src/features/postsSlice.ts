import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type State = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsInit = createAsyncThunk(
  'posts/fetch', (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(postsInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(postsInit.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(postsInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
