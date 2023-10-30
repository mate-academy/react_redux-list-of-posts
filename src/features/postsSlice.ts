import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsTypeState {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: PostsTypeState = {
  loaded: false,
  hasError: false,
  items: [],
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    addError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    addLoad: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
