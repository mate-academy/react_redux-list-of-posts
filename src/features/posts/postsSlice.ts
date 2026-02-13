import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import * as postsApi from '../../api/posts';

export type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/loadPosts',
  async (userId: number) => {
    const data = await postsApi.getPosts(userId);

    return data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(loadPosts.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }));
  },
});

export const { setItems, setLoaded, setError, reset } = postsSlice.actions;
export default postsSlice.reducer;
