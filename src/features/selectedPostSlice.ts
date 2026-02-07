import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null;

const selectedPostSlice = createSlice({
  name: 'post',
  initialState: initialState as Post | null,
  reducers: {
    set: (_post, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
