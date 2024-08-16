import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as deleteFromApi,
  getPostComments,
} from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsItems = {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsItems = {
  comments: [],
  loaded: false,
  hasError: '',
};

export const commentsAsync = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(commentsAsync.pending, state => ({
        ...state,
        loaded: true,
      }))
      .addCase(
        commentsAsync.fulfilled,
        (state, action: PayloadAction<Comment[]>) => ({
          ...state,
          loaded: false,
          comments: action.payload,
        }),
      )
      .addCase(commentsAsync.rejected, state => ({
        ...state,
        hasError: 'Error load comments',
        loaded: false,
      }));
  },
});
export const { setComments, removeComment } = commentsSlice.actions;

export const createsComment = createAsyncThunk(
  'comment/post',
  async (
    data: Pick<Comment, 'name' | 'email' | 'body' | 'postId'>,
    { dispatch },
  ) => {
    const response = await createComment(data);

    dispatch(setComments(response));

    return response;
  },
);

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (commentId: number, { dispatch }) => {
    const response = await deleteFromApi(commentId);

    dispatch(removeComment(commentId));

    return response;
  },
);

export default commentsSlice.reducer;
