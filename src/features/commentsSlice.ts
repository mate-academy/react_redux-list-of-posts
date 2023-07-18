import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
}

const initialState: CommentsState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('comments/fetch',
  async (id: number) => {
    const postsComments = await getPostComments(id);

    return postsComments;
  });

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action:PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    remove: (state, action:PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
