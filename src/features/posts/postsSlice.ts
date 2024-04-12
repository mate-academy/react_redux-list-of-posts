import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
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
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => ({
      ...state,
      loaded: false,
    }));
    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: action.payload,
    }));
    builder.addCase(fetchPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;

export default postsSlice.reducer;
