import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type State = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsInit = createAsyncThunk(
  'comments/fetch', (postId: number) => getPostComments(postId),
);

export const commentsCreate = createAsyncThunk(
  'comments/create', async ({
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

export const commentsDelete = createAsyncThunk(
  'comments/delete', (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      comments: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(commentsInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(commentsInit.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(commentsInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(commentsCreate.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(commentsCreate.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(commentsDelete.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;
