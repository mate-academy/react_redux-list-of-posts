import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state: CommentsState, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }),
    setCommentsError: (state: CommentsState) => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
  },
});

export const { setComments, setCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;
