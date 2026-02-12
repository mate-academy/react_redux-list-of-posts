import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface SetAuthorPayload {
  author: User;
}

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<SetAuthorPayload>) => {
      return action.payload.author;
    },
  },
});

const {
  actions: { setAuthor },
} = authorSlice;

export { setAuthor };
