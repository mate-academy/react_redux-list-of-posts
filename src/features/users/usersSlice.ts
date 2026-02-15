import { getUsers } from '../../api/users';
import { createAppSlice } from '../../app/createAppSlice';
import { User } from '../../types/User';

export interface UsersSliceState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersSliceState = {
  users: [],
  status: 'idle',
};

export const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers: create => ({
    loadUsers: create.asyncThunk(
      async () => {
        const users = await getUsers();

        return users;
      },
      {
        pending: state => {
          return {
            ...state,
            status: 'loading',
          };
        },
        fulfilled: (state, action) => {
          return {
            ...state,
            status: 'idle',
            users: action.payload,
          };
        },
        rejected: state => {
          return {
            ...state,
            status: 'failed',
          };
        },
      },
    ),
  }),
});
