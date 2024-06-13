import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  value: Post | null;
};

const initialState: State = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',

  initialState,

  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
    clear: state => {
      // eslint-disable-next-line no-param-reassign
      state.value = null;
    },
  },
});

export const actions = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
