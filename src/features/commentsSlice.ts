import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { loaded: false, hasError: false, items: [] as Comment[] };

export const fetchCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchByPost',
  async postId => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    );

    if (!res.ok) {
      throw new Error('Network error');
    }

    return (await res.json()) as Comment[];
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      // eslint-disable-next-line no-param-reassign
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export const { clearComments, addComment, removeComment } =
  commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
