import { getUsers } from '../../api/users';

export function loadUsers() {
  return getUsers();
}
