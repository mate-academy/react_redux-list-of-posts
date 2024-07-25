import { User } from '../../types/User';

// Create a promise that resolves with a given amount after 500ms
export function fetchUsers(users: User[]) {
  return new Promise<User[]>(resolve => {
    setTimeout(() => resolve(users), 500);
  });
}
