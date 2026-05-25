import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

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
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    },

    setPostsError: state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    },

    startLoadingPosts: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    },
  },
});

export const { setPosts, setPostsError, startLoadingPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
