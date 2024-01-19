import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  post: Post | null
};

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => {
      return { post: action.payload };
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
