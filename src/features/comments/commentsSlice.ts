import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  error: null | string,
  visible: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
  visible: false,
};

export const initComments = createAsyncThunk('comments/fetch',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  });

export const addComment = createAsyncThunk('comment/add',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => (
        comment.id !== action.payload
      ));

      deleteComment(action.payload);
    },
    showForm: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.visible = false;
      state.loading = true;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.error = 'Unable to load comments from server';
      state.loading = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export const { remove, showForm } = commentsSlice.actions;
export default commentsSlice.reducer;
