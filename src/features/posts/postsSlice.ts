import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
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
        hasError: true,
        loaded: true,
      };
    },

    setPostsLoading: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
        items: [],
      };
    },
  },
});

export const { setPosts, setPostsError, setPostsLoading } = postsSlice.actions;
export default postsSlice.reducer;
