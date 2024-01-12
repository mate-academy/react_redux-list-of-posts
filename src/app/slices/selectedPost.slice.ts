import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { select } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
