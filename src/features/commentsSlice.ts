import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteCommentAction: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
    changeCommentsLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    changeCommentsError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export default commentsSlice.reducer;
export const {
  changeComments,
  changeCommentsError,
  changeCommentsLoaded,
  addCommentAction,
  deleteCommentAction,
} = commentsSlice.actions;
