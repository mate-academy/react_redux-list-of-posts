import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[];
  isCommentsLoading: boolean;
  hasError: boolean;
  visible: boolean;
  submitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  hasError: false,
  visible: false,
  submitting: false,
};

export const { initComments, addComment, onDeleteComment } = {
  initComments: createAsyncThunk('comments/fetch', (id: number) => {
    return getPostComments(id);
  }),

  addComment: createAsyncThunk('comments/add', (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  }),

  onDeleteComment: createAsyncThunk('comment/delete', async (id: number) => {
    deleteComment(id);

    return id;
  }),
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      /*eslint no-param-reassign: "error"*/
      state.visible = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.visible = false;
      state.hasError = false;
      state.isCommentsLoading = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = true;
    });

    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.isCommentsLoading = true;
    });

    builder.addCase(addComment.pending, state => {
      state.submitting = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.submitting = false;
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
      state.submitting = false;
    });

    builder.addCase(onDeleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export const { setVisible } = commentsSlice.actions;
export default commentsSlice.reducer;
