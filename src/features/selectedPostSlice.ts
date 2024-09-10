import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { setAuthor } from './authorSlice';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    selectPost: (_state, { payload }: PayloadAction<Post>) => {
      return payload;
    },
    clearSelect: () => null,
  },
  extraReducers(builder) {
    builder.addCase(setAuthor.type, () => null);
  },
});

export default selectedPostSlice.reducer;
export const { selectPost, clearSelect } = selectedPostSlice.actions;
