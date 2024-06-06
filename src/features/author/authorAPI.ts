import { getUser } from '../../api/users';
import { User } from '../../types/User';

export function fetchAutorById(id: number) {
  return new Promise<User>(resolve => resolve(getUser(id)));
}
