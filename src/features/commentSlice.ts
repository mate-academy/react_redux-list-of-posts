/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type InitialState = {
  comments: Comment[];
  hasError: boolean;
  loaded: boolean;
  visible: boolean;
};

const initialState: InitialState = {
  comments: [],
  hasError: false,
  loaded: false,
  visible: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      const commentId = action.payload;

      state.comments = state.comments.filter(
        comment => comment.id != commentId,
      );
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });
    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentSlice.reducer;
export const { deleteComment, setVisible, addComment } = commentSlice.actions;
