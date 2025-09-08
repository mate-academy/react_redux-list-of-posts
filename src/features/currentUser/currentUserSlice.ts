import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import userSlice from "../users/userSlice";

interface CurrentUserState {
  item: User | null;
}
const initialState: CurrentUserState = {
  item: null,
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) =>{
      state.item = action.payload;
    },
    clearCurrentUser: (state) =>{
      state.item = null;
    }
  }
})
export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
export type { CurrentUserState };
