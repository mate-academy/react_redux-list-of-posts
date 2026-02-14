import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthorState {
  id: string | null;
  name: string | null;
}

const initialState: AuthorState = {
  id: null,
  name: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<AuthorState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
