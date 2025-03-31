import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const initialState = {
  comments: [] as Comment[],
  loading: false,
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }: PayloadAction<Comment[]>) => {
      return { ...state, comments: payload };
    },

    addComment: (state, { payload }: PayloadAction<Comment>) => {
      return { ...state, comments: [...state.comments, payload] };
    },

    deleteComment: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      return { ...state, loading: true, error: '' };
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      return { ...state, loading: false, comments: action.payload };
    });

    builder.addCase(loadComments.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message || '' };
    });
  },
});

export const { setComments, addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
