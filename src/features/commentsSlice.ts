import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
};

const initialAuthor: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialAuthor,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      const currentState = state;

      currentState.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.hasError = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setComments, setLoaded, setError } = commentsSlice.actions;
export const postComments = (state: RootState) => state.postComments;
