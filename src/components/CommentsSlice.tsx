/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type NewComent = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type CommentPost = {
  comments: Comment[];
  newComent: NewComent;
  send: boolean;
  opened: boolean;
  selectedComment: number | null;
  loading: boolean;
  error: string;
};

const initialState: CommentPost = {
  comments: [],
  newComent: {
    postId: 0,
    name: '',
    email: '',
    body: '',
  },
  send: true,
  opened: false,
  selectedComment: null,
  loading: false,
  error: '',
};

export const getComments = createAsyncThunk(
  `/commentsGet`,
  (selectedPost: number) => {
    return getPostComments(selectedPost);
  }
);

export const delets = createAsyncThunk(
  `/commentsDel`,
  (selectedPost: number) => {
    return deleteComment(selectedPost);
  }
);

export const create = createAsyncThunk(
  `/commentsCreate`,
  (comment: NewComent) => {
    return createComment(comment);
  }
);

export const CommentsContext = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      const currentState = state;

      currentState.comments = action.payload;
    },
    setOpened(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.opened = action.payload;
    },
    setSelectedComments(state, action: PayloadAction<number>) {
      const currentState = state;

      currentState.selectedComment = action.payload;
      currentState.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    setName(state, action: PayloadAction<string>) {
      const currentState = state;

      currentState.newComent.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      const currentState = state;

      currentState.newComent.email = action.payload;
    },
    setBody(state, action: PayloadAction<string>) {
      const currentState = state;

      currentState.newComent.body = action.payload;
    },
    setPostId(state, action: PayloadAction<number>) {
      const currentState = state;

      currentState.newComent.postId = action.payload;
    },
    setSend(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.send = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      const currentState = state;

      currentState.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = action.payload;
      currentState.loading = false;
    });
    builder.addCase(getComments.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'Error';
    });
    builder.addCase(delets.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = currentState.comments.filter(
        comment => comment.id !== action.payload?.id,
      );
    })
    builder.addCase(create.pending, state => {
      const currentState = state;

      currentState.send = false;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = [...state.comments, action.payload];
      currentState.newComent.body = '';
      currentState.newComent.name = '';
      currentState.newComent.email = '';
      currentState.send = true;
    });
  },
});

export const {
  setComments,
  setOpened,
  setSelectedComments,
  setName,
  setEmail,
  setBody,
  setPostId,
  setSend,
} = CommentsContext.actions;

export default CommentsContext.reducer;
