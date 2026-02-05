import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getPostComments } from "../../api/comments";
import { Comment } from "../../types/Comment";


export const commentsThunkGet = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId)
  }
)

export const commentsThunkCreate = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data)
  }
)
export const commentsThunkDelete = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId)
  }
)
export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {items: [] as Comment[], loaded: false, hasError: false },
  reducers: { clear: (state) => { state.items = []; } },
  extraReducers: (builder) => {
    builder.addCase(commentsThunkCreate.fulfilled, (state, action) => {
      state.items.push(action.payload)},
    )
    builder.addCase(commentsThunkGet.fulfilled, (state, action) => {
      state.items = action.payload,
      state.loaded = true;
    },
    )
    builder.addCase(commentsThunkGet.pending, state => {
      state.loaded = false;
      state.hasError = false;
    })
    builder.addCase(commentsThunkDelete.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.meta.arg);
    },
    )
  }
})

export default commentsSlice.reducer;
