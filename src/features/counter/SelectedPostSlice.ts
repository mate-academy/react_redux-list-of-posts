import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPostState {
  id: string | null;
}

const initialState: SelectedPostState = {
  id: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
