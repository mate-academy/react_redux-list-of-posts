/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Comment, CommentData } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Status } from '../enum/enum';

export interface CounterState {
  comments: Comment[] | [];
  newComment: CommentData;
  errors: {
    name: boolean,
    email: boolean,
    body: boolean,
  };
  hasForm: boolean;
  statusCreate: Status;
  status: Status;
}

const initialState: CounterState = {
  comments: [],
  newComment: {
    name: '',
    email: '',
    body: '',
  },
  errors: {
    name: false,
    email: false,
    body: false,
  },
  hasForm: false,
  statusCreate: Status.idle,
  status: Status.idle,
};

export const getFromServerCommnets = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    const value = await getPostComments(id);

    return value;
  },
);

export const createFromServerPost = createAsyncThunk(
  'comments/createComment',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

export const deleteFromServerPost = createAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.newComment.name = action.payload;
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.newComment.email = action.payload;
    },
    addBody: (state, action: PayloadAction<string>) => {
      state.newComment.body = action.payload;
    },
    checkedValue: (state) => {
      state.errors.body = !(state.newComment.body.length >= 4);
      state.errors.email = !(state.newComment.email.length >= 4);
      state.errors.name = !(state.newComment.name.length >= 4);
    },
    clearValue: (state) => {
      state.errors.body = false;
      state.errors.email = false;
      state.errors.name = false;
      state.newComment.body = '';
      state.newComment.email = '';
      state.newComment.name = '';
    },
    activeForm: (state) => {
      state.hasForm = true;
    },
    disForm: (state) => {
      state.hasForm = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFromServerPost.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => action.payload !== comment.id);
      })
      .addCase(deleteFromServerPost.rejected, (state) => {
        state.comments = [];
      })
      .addCase(createFromServerPost.pending, (state) => {
        state.statusCreate = Status.loading;
      })
      .addCase(createFromServerPost.fulfilled, (state, action) => {
        state.statusCreate = Status.idle;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(createFromServerPost.rejected, (state) => {
        state.statusCreate = Status.failed;
        state.comments = [];
      })
      .addCase(getFromServerCommnets.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getFromServerCommnets.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.comments = action.payload;
      })
      .addCase(getFromServerCommnets.rejected, (state) => {
        state.status = Status.failed;
        state.comments = [];
      });
  },
});
export const {
  checkedValue,
  clearValue,
  addName,
  addBody,
  addEmail,
  activeForm,
  disForm,
} = commentsSlice.actions;

export default commentsSlice.reducer;
