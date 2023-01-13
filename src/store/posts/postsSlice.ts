import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './postsAsync';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  error: string,
  currentPost: Post | null;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  error: '',
  currentPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePost: (state: PostsState, action) => ({
      ...state,
      currentPost: action.payload,
    }),
    setInitialField: <IStateKey extends keyof PostsState>(
      state: PostsState, action: PayloadAction<IStateKey>) => ({
      ...state,
      [action.payload]: initialState[action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
    // fetch posts
      .addCase(fetchPosts.pending, (state: PostsState) => ({
        ...state,
        loaded: false,
      }))
      .addCase(fetchPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => ({
          ...state,
          posts: action.payload,
          loaded: true,
        }))
      .addCase(fetchPosts.rejected, (state: PostsState) => ({
        ...state,
        loaded: true,
      }));
  },
});

export const postsAction = postsSlice.actions;
export default postsSlice.reducer;
