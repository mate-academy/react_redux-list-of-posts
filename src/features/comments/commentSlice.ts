import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string;
}

const initialState: CommentState = {
  comments: [] as Comment[],
  loading: false,
  error: '',
};

export const uploadComments = createAsyncThunk(
  'comments/uploadComments',
  async (id: number) => {
    const value = await getPostComments(id);

    return value;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommnet: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },

    deleteComments: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    setError: state => {
      state.error = 'Error loading comments';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(uploadComments.pending, state => {
        state.loading = true;
      })
      .addCase(uploadComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(uploadComments.rejected, state => {
        state.loading = false;
        state.error = 'Error loading comments';
      });
  },
});

export const { addCommnet, deleteComments, setError } = commentSlice.actions;
export default commentSlice.reducer;
