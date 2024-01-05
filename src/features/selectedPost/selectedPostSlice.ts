import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<SelectedPostState['selectedPost']>) => {
      state.selectedPost = action.payload;// eslint-disable-line no-param-reassign
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
