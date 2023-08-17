/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const initialState: SelectedPostState = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
};

const SelectedPostSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Post>) => {
      const {
        id,
        userId,
        title,
        body,
      } = action.payload;

      state.id = id;
      state.userId = userId;
      state.title = title;
      state.body = body;
    },
    closeSelected: (state) => {
      const {
        id,
        userId,
        title,
        body,
      } = initialState;

      state.id = id;
      state.userId = userId;
      state.title = title;
      state.body = body;
    },
  },
});

export const { setSelected, closeSelected } = SelectedPostSlice.actions;

export default SelectedPostSlice.reducer;
