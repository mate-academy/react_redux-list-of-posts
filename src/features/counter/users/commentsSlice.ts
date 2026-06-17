/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../../types/Comment'; // Проверь путь к типам
import { getPostComments } from '../../../api/comments'; // Проверь имя функции и путь к API

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

// Асинхронный танк для загрузки комментариев по id поста
export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    // Экшен для добавления нового комментария в конец массива
    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    // Экшен для удаления комментария по его id
    deleteCommentAction: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(initComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearComments, addCommentAction, deleteCommentAction } =
  commentsSlice.actions;
export default commentsSlice.reducer;
