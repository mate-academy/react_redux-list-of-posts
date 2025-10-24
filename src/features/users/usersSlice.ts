// src/features/users/usersSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Assumindo que você irá importar sua API aqui:
import { getUsers } from '../../api/users';
import { User } from '../../types/User'; // Se o seu projeto usa TypeScript

// ----------------------------------------------------------------------
// 1. O THUNK: Função Assíncrona para buscar os usuários
// ----------------------------------------------------------------------
export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    // Chama sua função da API
    const users = await getUsers();

    return users; // O valor retornado se torna o 'payload' no estado 'fulfilled'
  },
);
// ----------------------------------------------------------------------

const initialState = {
  items: [] as User[], // Lista de todos os usuários
  activeAuthorId: null as number | null, // O ID do autor ativo
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Reducer simples para definir o autor ativo (chamado de forma síncrona)
    authorSelected(state, action) {
      return {
        ...state,
        activeAuthorId: action.payload,
      };
    },
  },

  // ----------------------------------------------------------------------
  // 2. EXTRARREDUTORES: Gerencia os 3 estados do Thunk (loading, success, error)
  // ----------------------------------------------------------------------
  extraReducers: builder => {
    builder
      // A) Carregando (Pending)
      .addCase(fetchUsers.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))

      // B) Sucesso (Fulfilled)
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))

      // C) Erro (Rejected)
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        loaded: true, // O carregamento terminou, mas com erro
        hasError: true,
        items: [],
      }));
  },
  // ----------------------------------------------------------------------
});

// Exporta a Action síncrona
export const { authorSelected } = usersSlice.actions;

// Exporta o Reducer
export default usersSlice.reducer;

// Seletor para pegar todos os usuários
import { RootState } from '../../app/store';
export const selectAllUsers = (state: RootState) => state.users.items;
// Seletor para pegar o autor ativo
export const selectActiveAuthorId = (state: RootState) =>
  state.users.activeAuthorId;
