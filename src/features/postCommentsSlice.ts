import { createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const postCommentsSlice = createSlice({
  name: 'users',
  initialState: {
    comments: [] as Comment[] | [],
    loaded: false,
    hasError: false,
  },
  reducers: {
    setComments(state, action) {
      return { ...state, comments: action.payload };
    },
    setLoaded(state, action) {
      return { ...state, loaded: action.payload };
    },
    setError(state, action) {
      return { ...state, hasError: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
  },
});

export const postCommentsReducer = postCommentsSlice.reducer;
export const { setLoaded, setError, setComments } = postCommentsSlice.actions;
