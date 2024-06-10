import { getUsers } from '../../api/users';

export function fetchUsers() {
  return getUsers();
}
