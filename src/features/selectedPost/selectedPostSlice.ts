import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selected: Post | null;
};

const initialState: SelectedPostState = {
  selected: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selected: action.payload,
    }),
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
