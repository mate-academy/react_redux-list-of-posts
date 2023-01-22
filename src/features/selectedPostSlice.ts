import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Post>) => action.payload,
    clear: () => null,
  },
});

const { actions, reducer } = selectedPostSlice;

export default reducer;
export const selectedPostActions = actions;
