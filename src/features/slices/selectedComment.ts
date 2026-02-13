import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface SelectedCommentState {
  selectedComment: Comment | null;
}

const initialState: SelectedCommentState = {
  selectedComment: null,
};

export const selectedCommentSlice = createSlice({
  name: 'selectedComment',
  initialState,
  reducers: {
    setSelectedComment(state, action: PayloadAction<Comment | null>) {
      state.selectedComment = action.payload;
    },
  },
});

export const selectedComment = (state: RootState) =>
  state.selectedComment.selectedComment;

export const { setSelectedComment } = selectedCommentSlice.actions;
export default selectedCommentSlice.reducer;
