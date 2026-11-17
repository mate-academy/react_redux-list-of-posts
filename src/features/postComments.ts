import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type PostCommentsState = {
  postComments: Comment[];
  isLoading: boolean;
  error: boolean;
};

const initialState: PostCommentsState = {
  postComments: [],
  isLoading: false,
  error: false,
};

export const fetchPostComments = createAsyncThunk(
  'postComments/fetchpostComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addPostComment = createAsyncThunk(
  'postComments/addPostComments',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const deletePostComment = createAsyncThunk(
  'postComments/deletePostComment',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.postComments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPostComments.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        state.postComments.push(action.payload);
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.postComments = state.postComments.filter(
          comment => comment.id != action.payload,
        );
      });
  },
});

export const postCommentsReducer = postCommentsSlice.reducer;
