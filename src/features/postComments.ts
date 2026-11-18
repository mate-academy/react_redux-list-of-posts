import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type PostCommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostCommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addPostComment = createAsyncThunk(
  'comments/addPostComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deletePostComment',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

const postCommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchPostComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const postCommentsReducer = postCommentsSlice.reducer;
