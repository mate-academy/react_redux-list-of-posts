import * as PostsActionCreators from './posts';
import * as UsersActionCreators from './users';

export default {
  ...PostsActionCreators,
  ...UsersActionCreators,
};
