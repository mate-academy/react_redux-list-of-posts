import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost | null,
  reducers: {
    selectPost(_, action: PayloadAction<SelectedPost | null>) {
      return action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
