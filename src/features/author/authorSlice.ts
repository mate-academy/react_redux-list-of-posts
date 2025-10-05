import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null
};


const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    clearAuthor: () => initialState,
    setAuthor: (state, action) => {
        state.author = action.payload;
    }
  },
});

export const { clearAuthor, setAuthor } = authorSlice.actions;

export default authorSlice.reducer;