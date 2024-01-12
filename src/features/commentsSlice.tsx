import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

const initialState = {
  loaded: false,
  hasError: false,
  comments: [] as Comment[],
};

export const init = createAsyncThunk(
  'comments/loadPostComments',
  async (postId: number) => {
    const comments = getPostComments(postId);

    return comments;
  },
);

export const createNewComment = createAsyncThunk(
  'comments/createNewComment',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const deletedComment = createAsyncThunk(
  'comments/createNewComment',
  async (commentData: number) => {
    const deleteThisComment = await deleteComment(commentData);

    return deleteThisComment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action) => {
      return { ...state, comments: [...state.comments, action.payload] };
    },

    deleteComments: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(com => com.id !== action.payload),
      };
    },

    setError: (state) => {
      return { ...state, hasError: true };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: true };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: false, comments: action.payload };
    });
    builder.addCase(init.rejected, (state) => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export default commentsSlice.reducer;
