import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

// Busca os comentários de uma publicação
export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

// Estrutura do estado dos comentários
type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  currentRequestId: string | null;
  postId: number | null;
};

// Estado inicial
const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  currentRequestId: null,
  postId: null,
};

const commentsSlice = createSlice({
  name: 'comments',

  initialState,

  reducers: {
    // Adiciona um comentário
    addComment: (state, action: PayloadAction<Comment>) => {
      if (state.postId !== action.payload.postId) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },

    // Remove um comentário
    removeComment: (
      state,
      action: PayloadAction<{ commentId: number; postId: number }>,
    ) => {
      if (state.postId !== action.payload.postId) {
        return state;
      }

      return {
        ...state,
        items: state.items.filter(
          comment => comment.id !== action.payload.commentId,
        ),
      };
    },

    // Registra um erro apenas na publicação correspondente
    setCommentsError: (state, action: PayloadAction<number>) => {
      if (state.postId !== action.payload) {
        return state;
      }

      return {
        ...state,
        hasError: true,
      };
    },
  },

  extraReducers: builder => {
    builder
      // Início do carregamento
      .addCase(loadComments.pending, (state, action) => ({
        ...state,
        items: [],
        loaded: false,
        hasError: false,
        currentRequestId: action.meta.requestId,
        postId: action.meta.arg,
      }))

      // Carregamento concluído
      .addCase(loadComments.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
          currentRequestId: null,
        };
      })

      // Erro no carregamento
      .addCase(loadComments.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          loaded: true,
          hasError: true,
          currentRequestId: null,
        };
      });
  },
});

export const { addComment, removeComment, setCommentsError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
