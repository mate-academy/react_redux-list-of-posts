import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  value: Post | null;
};

const initialState: State = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});
