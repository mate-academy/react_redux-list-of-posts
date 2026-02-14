import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  postId: string;
  text: string;
}

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
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.loaded = true;
    },
    setCommentsError: (state) => {
      state.hasError = true;
    },
  },
});

export const { setComments, setCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;
