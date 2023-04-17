/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface Comments {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Comments = {
  items: [],
  loaded: false,
  hasError: false,
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
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
});

export default commentsSlice.reducer;
export const {
  addComments,
  deleteCommentById,
  setIsLoaded,
  setHasError,
} = commentsSlice.actions;

export const allComments = (state: RootState) => state.comments.items;
export const isLoaded = (state: RootState) => state.comments.loaded;
export const hasCommentsError = (state: RootState) => state.comments.hasError;
