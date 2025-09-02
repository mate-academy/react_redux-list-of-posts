import { User } from './User';

export interface UsersState {
  items: User[];
  loading: boolean;
  hasError: boolean;
  selectedUserId: number | null;
}
