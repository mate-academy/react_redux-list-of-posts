/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface Comments {
  items: Comment[];
}

const initialState: Comments = {
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    deleteCommentById: (state, action: PayloadAction<number>) => {
      const filteredItems = state.items.filter(i => i.id !== action.payload);

      return {
        ...state,
        items: filteredItems,
      };
    },
  },
});

export default commentsSlice.reducer;
export const {
  addComments,
  deleteCommentById,
} = commentsSlice.actions;

export const allComments = (state: RootState) => state.comments.items;
