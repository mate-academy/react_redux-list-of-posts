import { User } from '../../types/User';
import { RootState } from '../store';

export const getAuthor = (store: RootState): User => store.author.item;
