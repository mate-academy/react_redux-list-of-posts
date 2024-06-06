import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export function fetchUsers() {
  return new Promise<User[]>(resolve => resolve(getUsers()));
}
