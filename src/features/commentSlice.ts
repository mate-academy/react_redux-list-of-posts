import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    return response.json();
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => ({
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: false,
        hasError: true,
      }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
