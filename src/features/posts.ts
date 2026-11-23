import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface InitialState {
  posts: Post[];
  selectedPost: Post | null;
  postsLoading: boolean;
  postsError: boolean;
}

const initialState: InitialState = {
  posts: [],
  selectedPost: null,
  postsLoading: false,
  postsError: false,
};

export const postsInit = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    selectPost: (state: InitialState, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost:
        state.posts.find(post => post.id === action.payload?.id) ?? null,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(postsInit.pending, state => ({
        ...state,
        postsLoading: true,
        posts: [],
      }))
      .addCase(postsInit.fulfilled, (state, action) => ({
        ...state,
        postsLoading: false,
        postsError: false,
        posts: action.payload,
      }))
      .addCase(postsInit.rejected, state => ({
        ...state,
        postsLoading: false,
        postsError: true,
      }));
  },
});

export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
