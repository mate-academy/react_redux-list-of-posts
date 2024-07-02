import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

type DataCreateNewComment = {
  data: Omit<Comment, 'id'>;
  fSet: (x: boolean) => void;
};

export const createNewComment = createAsyncThunk(
  'comments/createNewComment',
  async (data: DataCreateNewComment) => {
    const comments = await createComment(data.data);

    data.fSet(false);

    return comments;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: true,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => ({ ...state, loaded: false }))
      .addCase(loadComments.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(loadComments.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }))

      .addCase(createNewComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(createNewComment.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }))

      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: state.items.filter(item => item.id !== action.payload),
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }));
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
