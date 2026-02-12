import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsLoading: (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }),

    setCommentsSuccess: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      loaded: true,
      hasError: false,
      items: action.payload,
    }),

    setCommentsError: (state) => ({
      ...state,
      loaded: true,
      hasError: true,
      items: [],
    }),

    clearComments: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),

    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
  },
});

export const {
  setCommentsLoading,
  setCommentsSuccess,
  setCommentsError,
  clearComments,
  addComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
export type { CommentsState };
