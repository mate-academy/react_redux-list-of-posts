import { RootState } from '../../app/store';

export const selectAuthor = (state: RootState) => state.author.author;
