import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState = {
  comments: [] as Comment[],
  commentsLoaded: true,
  commentsHasError: false,
  visible: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      return { ...state, comments: action.payload };
    },
    setCommentsHasError: (state, action) => {
      return { ...state, commentsHasError: action.payload };
    },
    setCommentsLoaded: (state, action) => {
      return { ...state, commentsLoaded: action.payload };
    },
    setVisible: (state, action) => {
      return { ...state, visible: action.payload };
    },
  },
});

export const {
  setComments, setCommentsHasError, setCommentsLoaded, setVisible,
} = commentsSlice.actions;
export default commentsSlice.reducer;
