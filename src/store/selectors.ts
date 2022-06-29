import { State } from '../react-app-env';

export const setUserSelector = (state: State) => state.users;
export const setPostsSelector = (state: State) => state.posts;
export const setCommentsSelector = (state: State) => state.comments;
