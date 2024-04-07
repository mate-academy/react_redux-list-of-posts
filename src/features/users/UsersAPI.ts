import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export function fetchUsers() {
  return new Promise<User[]>((resolve, reject) => {
    try {
      const users = getUsers();

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
}
