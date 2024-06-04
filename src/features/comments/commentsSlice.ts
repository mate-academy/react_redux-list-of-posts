/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Comment } from '../../types/Comment';
import { getPostComments, deleteComment} from '../../api/comments';

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const deleteComments = createAsyncThunk('comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  }
);

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visibleNewForm: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visibleNewForm: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: (state) => {
      state.comments = [];
    },
    setNewComment: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setVisibleNewForm: (state, action: PayloadAction<boolean>) => {
      state.visibleNewForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      state.comments =
        state.comments.filter(comment => comment.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const {
  clear, setNewComment, setError, setVisibleNewForm
} = commentsSlice.actions;


