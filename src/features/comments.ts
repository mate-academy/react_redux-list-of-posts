/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommetsState = {
  comments: Comment[];
  error: string;
  loading: boolean;
};

const initialState: CommetsState = {
  comments: [],
  error: '',
  loading: false,
};

export const init = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    deleteComment: (state, action: PayloadAction<Comment>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload.id,
      );
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, (state: CommetsState) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state: CommetsState) => {
      state.loading = false;
      state.error = 'Error loading users';
    });
  },
});

export default commentsSlice.reducer;
export const { setComments, addComment, deleteComment } = commentsSlice.actions;
