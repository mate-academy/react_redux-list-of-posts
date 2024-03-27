/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
    setCommentError: (state, action: PayloadAction<string>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = 'Something with Commentss went wrong!';
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, setCommentError } =
  commentsSlice.actions;
