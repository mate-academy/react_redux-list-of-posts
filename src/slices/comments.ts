import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type ComentsSliceType = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: ComentsSliceType = {
  comments: [],
  loaded: false,
  hasError: false,
}

export const commetsSlice = createSlice({
  name: 'commets',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload
    },
    setError: (state, action) => {
      state.hasError = action.payload
    },
  },
});

export default commetsSlice.reducer;
export const { setComments, setError, setLoaded } = commetsSlice.actions;
