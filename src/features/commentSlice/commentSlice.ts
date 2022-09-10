import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface NewComment {
  name: string,
  email: string,
  body: string,
}

export interface NewCommentError {
  name: boolean,
  email: boolean,
  body: boolean,
}

export interface InitialState {
  comments: Comment[],
  newComment: NewComment,
  newCommentError: NewCommentError,
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
  status: 'idle' | 'loading' | 'failed',
}

export const initialState: InitialState = {
  newComment: {
    name: '',
    email: '',
    body: '',
  },
  newCommentError: {
    name: false,
    email: false,
    body: false,
  },
  loaded: false,
  hasError: false,
  visible: false,
  comments: [],
  status: 'idle',
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getCommentsAsync', getPostComments,
);

export const createCommentsAsync = createAsyncThunk(
  'comments/createCommentsAsync', createComment,
);

export const deleteCommentsAsync = createAsyncThunk(
  'comments/deleteCommentsAsync', deleteComment,
);

export const commentsReducer = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state) => {
      state.visible = true;
    },
    setNewCommentField: (
      state,
      { payload }: PayloadAction<{
        key: 'name' | 'email' | 'body',
        value: string
      }>,
    ) => {
      state.newComment[payload.key] = payload.value;
    },
    setNewCommentError: (
      state,
      { payload }: PayloadAction<NewCommentError>,
    ) => {
      state.newCommentError = { ...payload };
    },
    clearNewComment: (state) => {
      state.newComment = initialState.newComment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.status = 'failed';
        state.comments = [];
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createCommentsAsync.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
        state.hasError = false;
      })
      .addCase(createCommentsAsync.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(deleteCommentsAsync.pending, ({ comments }, { payload }) => {
        const commentIndex = comments.findIndex(({ id }) => id === payload);

        comments.splice(commentIndex, 1);
      });
  },
});

export default commentsReducer.reducer;

export const {
  setVisible, setNewCommentField, setNewCommentError, clearNewComment,
} = commentsReducer.actions;
