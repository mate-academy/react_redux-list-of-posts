import { User } from '../react-app-env';
import { BASE_URL } from './api';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}
