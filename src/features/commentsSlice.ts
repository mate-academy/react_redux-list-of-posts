/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: true,
  error: false,
  visible: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },

  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loading = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loading = true;
      state.error = true;
    });
  },
});

export default commentsSlice.reducer;
export const { toggleVisible, setError, addComment, removeComment } =
  commentsSlice.actions;
