import { client } from '../../utils/fetchClient';
import { User } from '../../types/User';

export function fetchUsers() {
  return client.get<User[]>('/users');
}
