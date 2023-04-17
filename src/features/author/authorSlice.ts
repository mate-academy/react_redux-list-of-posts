import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface Author {
  allUsers: User[]
  selectedAuthor: User | null;
}

const initialState: Author = {
  allUsers: [],
  selectedAuthor: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedAuthor: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        selectedAuthor: action.payload,
      };
    },
    setAllUsers: (state, action:PayloadAction<User[]>) => {
      return {
        ...state,
        allUsers: action.payload,
      };
    },
  },
});

export default authorSlice.reducer;
export const { setSelectedAuthor, setAllUsers } = authorSlice.actions;
export const currentAuthor = (state: RootState) => state.author.selectedAuthor;
export const allUsers = (state: RootState) => state.author.allUsers;
