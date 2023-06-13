import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  author: User | null
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;

// export const init = createAsyncThunk('users/fetch', () => {
//   return fetchGoods();
// });
