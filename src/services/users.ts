import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(getUsers());
    }, 2000);
  });
};
