// src/slices/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as usersApi from '../api/users';
import { User } from '../types/User';

export type UsersState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
  errorMessage?: string | null;
};

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
  errorMessage: null,
};

function getErrorMessage(err: unknown, fallback = 'Unknown error'): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  try {
    const s = JSON.stringify(err);

    return s === '{}' ? fallback : s;
  } catch {
    return fallback;
  }
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await usersApi.getUsers();

    return data as User[];
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to fetch users'));
  }
});

export const fetchUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>('users/fetchById', async (userId, { rejectWithValue }) => {
  if (typeof userId !== 'number' || Number.isNaN(userId)) {
    return rejectWithValue('Invalid userId');
  }

  try {
    const data = await usersApi.getUserById(userId);

    return data as User;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to fetch user'));
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(_state, action: PayloadAction<User[]>) {
      return {
        ...initialState,
        items: action.payload,
        loaded: true,
      } as UsersState;
    },
    clearUsers() {
      return { ...initialState };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, () => {
        return {
          ...initialState,
          loaded: false,
          hasError: false,
          errorMessage: null,
          items: [],
        };
      })
      .addCase(
        fetchUsers.fulfilled,
        (_state, action: PayloadAction<User[]>) => {
          return {
            ...initialState,
            items: action.payload,
            loaded: true,
            hasError: false,
          };
        },
      )
      .addCase(fetchUsers.rejected, (_state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to fetch users';

        return {
          ...initialState,
          loaded: true,
          hasError: true,
          items: [],
          errorMessage: msg,
        };
      })
      .addCase(fetchUserById.pending, state => {
        return {
          ...state,
          hasError: false,
          errorMessage: null,
        };
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          const updatedItems = state.items.some(u => u.id === action.payload.id)
            ? state.items.map(u =>
                u.id === action.payload.id ? action.payload : u,
              )
            : [...state.items, action.payload];

          return {
            ...state,
            items: updatedItems,
          };
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to fetch user';

        return {
          ...state,
          hasError: true,
          errorMessage: msg,
        };
      });
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

// Seletores tipados.
// Se você tiver RootState em src/app/store, prefira importar e usar aqui:
export const selectUsers = (state: { users: UsersState }) => state.users.items;
export const selectUsersLoaded = (state: { users: UsersState }) =>
  state.users.loaded;
export const selectUsersHasError = (state: { users: UsersState }) =>
  state.users.hasError;
export const selectUsersErrorMessage = (state: { users: UsersState }) =>
  state.users.errorMessage ?? null;

export default usersSlice.reducer;
