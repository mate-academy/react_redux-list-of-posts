import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsTypeState {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
}

const initialState: CommentsTypeState = {
  loaded: false,
  hasError: false,
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
    addError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    addLoad: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items
          .filter(comment => comment.id !== action.payload),
      };
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
