import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../types/Comment";
import { getPostComments } from "../../api/comments";

const initialState = {
  loaded: false,
  items: [] as Comment[],
  hasError: false,
}

export const loadComments = createAsyncThunk<Comment[], number>('/comments', async (id: number) => await getPostComments(id))

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload)
    },

    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = false;
    })
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
