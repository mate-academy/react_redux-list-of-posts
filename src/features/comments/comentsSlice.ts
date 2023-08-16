import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  error: string;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  error: '',
};

export const init = createAsyncThunk('fetch/comments', (selectedPost: Post) => {
  return getPostComments(selectedPost.id);
});

const comentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (
      state,
      action: PayloadAction<Comment[]>,
    ) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.error = 'Something went wrong.';
    });
  },
});

export default comentsSlice.reducer;
export const { clear } = comentsSlice.actions;
