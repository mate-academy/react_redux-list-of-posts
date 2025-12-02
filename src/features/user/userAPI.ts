import { getUsers } from '../../api/users';

export const fetchUsers = async () => {
  const data = await getUsers();

  return data;
};
