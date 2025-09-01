import { User } from './User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  selectedUserId: number | null;
}
