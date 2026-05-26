/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface Comments {
  comments: Comment[];
}

const initialState: Comments = {
  comments: [],
};

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      const idtoRemove = action.payload;

      state.comments = state.comments.filter(
        comment => comment.id !== idtoRemove,
      );
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, removeComment, addComment } = CommentsSlice.actions;

export default CommentsSlice.reducer;
