import { BASE_URL, request } from './api';
// import { User } from '../types';

export function getUsers() {
  console.log(`${BASE_URL}/users`);
  return request('users')
    // .then(users => users.filter((elem: User, i: number, self: User[]) => i === 0 || elem.name !== self[i - 1].name));
}
