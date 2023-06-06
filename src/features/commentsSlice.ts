import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getComments = createAsyncThunk(
  'comments/fetch', (postId: number) => {
    return getPostComments(postId);
  },
);

export const createNewComment = createAsyncThunk(
  'comment/create', async ({
    name,
    email,
    body,
    id: postId,
  }: CommentData & Pick<Post, 'id'>) => {
    const newComment = await createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comment/delete', (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(getComments.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }));

    builder.addCase(getComments.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));

    builder.addCase(createNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(createNewComment.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));

    builder.addCase(removeComment.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;
