import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../types/Comment";
import { getPostComments,createComment,deleteComment } from "../../api/comments";

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);
    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>) => {
    const value = await createComment(newComment);
    return value;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
     await deleteComment(commentId);
    return commentId;
  },
);
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
})
export default commentsSlice.reducer;
