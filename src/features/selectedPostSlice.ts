import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPosts',
  initialState: null as State,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<State>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
