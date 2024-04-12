import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelecterPostState = Post | null;

const initialState: SelecterPostState = null;

const selecterPostSlice = createSlice({
  name: 'selecterPost',
  initialState,
  reducers: {
    selectPost: (_, action) => {
      return action.payload;
    },
  },
});

export default selecterPostSlice.reducer;
export const { selectPost } = selecterPostSlice.actions;
