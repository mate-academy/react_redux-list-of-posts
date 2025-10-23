import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

const initialState = {
  loaded: false,
  items: [] as Comment[],
  hasError: false,
};

export const loadComments = createAsyncThunk<Comment[], number>(
  '/comments',
  async (id: number) => getPostComments(id),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
    add: (state, action: PayloadAction<Comment>) => {
      // eslint-disable-next-line no-param-reassign
      state.items.push(action.payload);
    },

    // eslint-disable-next-line no-param-reassign
    remove: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });

    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadComments.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
