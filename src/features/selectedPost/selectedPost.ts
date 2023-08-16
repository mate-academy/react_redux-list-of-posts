import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },

    clear: () => initialState,
  },
});

export default selectedPostSlice.reducer;
export const { set, clear } = selectedPostSlice.actions;
