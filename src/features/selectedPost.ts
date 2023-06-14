import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { set as authorAction } from './author';

type SelectedPostState = {
  selectedPost: Post | null
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectePost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorAction.type, (state) => {
      state.selectedPost = null;
    });
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
