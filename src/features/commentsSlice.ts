/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  visible: boolean;
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  visible: false,
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clear: state => {
      state.comments = [];
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.fulfilled, (state, actions) => {
      state.loaded = true;
      state.comments = actions.payload;
    });

    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { add, remove, clear, setVisible, setLoaded, setError } =
  commentsSlice.actions;
export default commentsSlice.reducer;
