import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState: Comment[] = [];

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => action.payload,
    addComment: (state, action: PayloadAction<Comment>) => {
      state.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      return state.filter(comment => comment.id !== action.payload);
    },
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
