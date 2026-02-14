import { User } from './User';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
