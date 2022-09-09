import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  selectedPostId: number | null,
}

const initialState: State = {
  selectedPostId: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectByPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const postsReducer = postSlice.reducer;
export const { selectByPostId } = postSlice.actions;
