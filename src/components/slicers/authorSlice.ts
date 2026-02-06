import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  export const authorSlice = createSlice({
    name: 'author',
    initialState:
    {
      selectedUserId: null as number | null,
},
    reducers: {
      setAuthor: (state, action: PayloadAction<number | null>) => {
        state.selectedUserId = action.payload
      },
    },
  })

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
