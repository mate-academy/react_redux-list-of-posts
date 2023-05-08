import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsAfterDelete: (state, action: PayloadAction<number>) => {
      const currentState = state;

      currentState.comments = currentState.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    setCommentsAfterCreate: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      const currentState = state;

      currentState.loaded = false;
    });

    builder.addCase(
      fetchPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        const currentState = state;

        currentState.comments = action.payload;
        currentState.loaded = true;
      },
    );

    builder.addCase(fetchPostComments.rejected, (state) => {
      const currentState = state;

      currentState.loaded = true;
      currentState.hasError = true;
    });
  },
});

export const {
  setCommentsAfterDelete, setCommentsAfterCreate,
} = commentsSlice.actions;
export default commentsSlice.reducer;
