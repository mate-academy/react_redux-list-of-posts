/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const emptyObj = {
  title: '',
  body: '',
  id: 0,
  userId: 0,
};

const initialState: Post = { ...emptyObj };

export const { reducer, actions } = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post>) => action.payload,
    clearSelectedPost: () => ({ ...emptyObj }),
  },
});
