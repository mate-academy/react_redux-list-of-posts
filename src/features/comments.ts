/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface Value {
  name: string;
  email: string;
  body: string;
}
interface ValueError {
  name: boolean;
  email: boolean;
  body: boolean;
}

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  loadingNewComment: boolean;
  error: string;
  isRemove: boolean;
  isError: string;
  isNewCommentError: boolean;
  valuesError: ValueError;
  values: Value;
  submitting: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loadingNewComment: false,
  loading: false,
  error: '',
  isRemove: false,
  isError: '',
  valuesError: {
    name: false,
    body: false,
    email: false,
  },
  values: {
    name: '',
    body: '',
    email: '',
  },
  submitting: false,
  isNewCommentError: false,
  visible: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: state => {
      state.comments = [];
      state.error = '';
      state.loading = false;
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      state.comments = state.comments.filter(c => c.id !== payload);
    },
    setValue: (state, { payload }: PayloadAction<Value>) => {
      state.values = payload;
    },
    setError: (state, { payload }: PayloadAction<ValueError>) => {
      state.valuesError = payload;
    },
    clear: state => {
      state.values = initialState.values;
      state.valuesError = initialState.valuesError;
    },
    setVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.visible = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
    builder.addCase(removeComment.pending, state => {
      state.isRemove = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
      state.isRemove = false;
    });
    builder.addCase(removeComment.rejected, state => {
      state.isRemove = false;
      state.isError = 'Error Remove';
    });
    builder.addCase(addComment.pending, state => {
      state.loadingNewComment = true;
      state.isNewCommentError = false;
      state.submitting = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loadingNewComment = false;
      state.submitting = false;
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(addComment.rejected, state => {
      state.isNewCommentError = true;
      state.submitting = false;
      state.loadingNewComment = false;
    });
  },
});

export const { actions } = commentsSlice;
