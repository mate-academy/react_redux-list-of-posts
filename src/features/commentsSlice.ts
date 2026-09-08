import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import {
  createComment,
  deleteComment as deleteCommentApi,
} from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return client.get<Comment[]>(`/comments?postId=${postId}`);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const response = await createComment(newComment);

    return response;
  },
);

// ✅ Перетворюємо deleteComment на createAsyncThunk
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    // Якщо у вас у src/api/comments.ts є deleteComment, використовуйте його:
    await deleteCommentApi(commentId);

    // Якщо функції в API немає, використовуйте безпосередньо client:
    // await client.delete(`/comments/${commentId}`);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))

      // Add comment
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))

      // Delete comment (оптимістично або при успішній відповіді)
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }));
  },
});

export default commentsSlice.reducer;
