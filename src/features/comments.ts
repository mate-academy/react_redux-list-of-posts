import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments } from '../api/comments';
import { deleteComment } from '../api/comments';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
};

export const searchComment = createAsyncThunk(
  'comments/fetch',

  async (postId: number) => {
    try {
      const response = await getPostComments(postId);

      return response;
    } catch (error) {
      throw new Error(`problem with fetching comment: ${error.message}`);
    }
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number, { getState }) => {
    await deleteComment(commentId);

    const state = getState() as { comments: CommentsState };
    const updatedComments = state.comments.comments.filter(
      comment => comment.id !== commentId,
    );

    return updatedComments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (
    content: Omit<Comment, 'id' | 'postId'>,
    { getState, rejectWithValue },
  ) => {
    const state = getState() as { posts: { selectedPost: { id: number } } };

    const postId = state.posts.selectedPost?.id;

    if (!postId) {
      return rejectWithValue('No selected post found');
    }

    try {
      return await createComment({ ...content, postId });
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add comment');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchComment.pending, state => {
        state.loading = true;
      })
      .addCase(
        searchComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        searchComment.rejected,
        (state, action: PayloadAction<string>) => {
          console.error(action.payload);
        },
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        },
      )
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      );
  },
});

export default commentsSlice.reducer;

export const { setComments } = commentsSlice.actions;
