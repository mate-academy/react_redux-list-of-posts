import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = null | Post;

const selectedPostSlice = createSlice({
  name: 'selectedPostSlice',
  initialState: null as SelectedPost,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<SelectedPost>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
