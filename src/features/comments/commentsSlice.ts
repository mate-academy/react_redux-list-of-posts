import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

const initialState = {
  items: [] as Comment[] | [],
  loaded: false,
  hasError: false,
};

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, items: action.payload };
    },
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),

    clear: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchCommentsByPost.pending, state => ({
      ...state,
      loaded: true,
    }));
    builder.addCase(fetchCommentsByPost.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: false,
    }));
    builder.addCase(fetchCommentsByPost.rejected, state => ({
      ...state,
      hasError: true,
      loaded: false,
    }));
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
