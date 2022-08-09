import { client } from '../utils/fetchClient';
// You can use axios and remove fetchClient if you want
// import { client } from '../utils/axiosClient';

import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
