import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post[] = [];

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.pop();

      state.push(action.payload);
    },

    deleteSelectedPost: () => [],
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, deleteSelectedPost } =
  selectedPostSlice.actions;
