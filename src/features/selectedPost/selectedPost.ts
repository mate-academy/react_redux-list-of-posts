import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  post: Post | undefined
};

const initialState: SelectedPostState = {
  post: undefined,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | undefined>) => {
      return { post: action.payload };
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
