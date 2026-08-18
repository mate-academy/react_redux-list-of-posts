import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

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

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: state => {
      return {
        ...state,
        hasError: false,
        loaded: false,
      };
    },

    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
        hasError: false,
        loaded: true,
      };
    },

    setError: state => {
      return {
        ...state,
        items: [],
        hasError: true,
        loaded: true,
      };
    },
  },
});

export const { setPosts, setError, setLoading } = postsSlice.actions;
export default postsSlice.reducer;
