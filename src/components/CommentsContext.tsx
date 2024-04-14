import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// import { start } from 'repl';

type NewComent = {
  postId: number;
  name: string;
  email: string;
  body: string;
}

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

export const getComments  = createAsyncThunk(`/commentsGet`, (selectedPost: number) => {
  return getPostComments(selectedPost);
});

export const delets = createAsyncThunk(`/commentsDel`, (selectedPost: number) => {
  return deleteComment(selectedPost);
});

export const create  = createAsyncThunk(`/commentsCreate`, (comment: NewComent) => {
  return createComment(comment);
});

export const CommentsContext = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    setOpened(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setSelectedComments(state, action: PayloadAction<number>) {
      state.selectedComment = action.payload;
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    setName(state, action: PayloadAction<string>) {
      state.newComent.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.newComent.email = action.payload;
    },
    setBody(state, action: PayloadAction<string>) {
      state.newComent.body = action.payload;
    },
    setPostId(state, action: PayloadAction<number>) {
      state.newComent.postId = action.payload;
    },
    setSend(state, action: PayloadAction<boolean>) {
      state.send = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(getComments.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
    builder.addCase(delets.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload?.id,
      );
    })
    builder.addCase(create.pending, state => {
      state.send = false;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.newComent.body = '';
      state.newComent.name = '';
      state.newComent.email = '';
      state.send = true;
    });
    // builder.addCase(create.rejected, state => {
      
    // });
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
