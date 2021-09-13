import { request } from './api';

export function getUsers() {
  return request('users');
}
