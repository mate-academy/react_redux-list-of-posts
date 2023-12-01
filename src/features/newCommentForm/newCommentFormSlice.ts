import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentData } from '../../types/Comment';

const initialState: CommentData = {
  name: '',
  email: '',
  body: '',
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    clear: () => {
      return initialState;
    },

    clearBody: (state) => {
      return { ...state, body: '' };
    },

    add: (state, action: PayloadAction<{
      name: string, email: string, body: string,
    }>) => {
      const { name, email, body } = action.payload;

      return {
        ...state, name, email, body,
      };
    },
  },
});

export const { actions } = newCommentFormSlice;
export default newCommentFormSlice.reducer;
