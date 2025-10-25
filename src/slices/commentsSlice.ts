import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comentario } from '../tipos/Comentario';
import { getCommentsByPostId } from '../api/comments';

interface ComentariosEstado {
  itens: Comentario[];
  carregado: boolean;
  hasError: boolean;
  postId: number | null;
}

const initialState: ComentariosEstado = {
  itens: [],
  carregado: false,
  hasError: false,
  postId: null,
};

export const fetchComments = createAsyncThunk(
  'comentarios/fetchComments',
  async (postId: number) => {
    const comentarios = await getCommentsByPostId(postId);
    return { postId, comentarios };
  }
);

const commentsSlice = createSlice({
  name: 'comentarios',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.itens = [];
      state.carregado = false;
      state.hasError = false;
      state.postId = null;
    },
    addComment: (state, action: PayloadAction<Comentario>) => {
      state.itens.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<Comentario>) => {
      const index = state.itens.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.itens[index] = action.payload;
      }
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.carregado = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<{ postId: number; comentarios: Comentario[] }>) => {
        state.itens = action.payload.comentarios;
        state.postId = action.payload.postId;
        state.carregado = true;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.carregado = true;
        state.hasError = true;
      });
  },
});

export const { resetComments, addComment, updateComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
