import { User } from './User';

export type UsersState = {
  users: User[],
  isLoading: boolean,
};
