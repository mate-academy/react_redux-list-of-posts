import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedPostState = {
  body: ReactNode;
  id: number | null;
};

const initialState: SelectedPostState = {
  id: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    clearSelectedPost: state => {
      state.id = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
