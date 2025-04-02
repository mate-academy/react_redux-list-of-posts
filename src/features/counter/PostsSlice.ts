import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
    },
    setPostsError: (state) => {
      state.hasError = true;
    },
  },
});

export const { setPosts, setPostsError } = postsSlice.actions;
export default postsSlice.reducer;
