import { User } from '../../types/User';
import { RootState } from '../store';

export const getUsers = (store: RootState): User[] => store.users.items;
