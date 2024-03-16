import { createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

export interface PostsStateType {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});
