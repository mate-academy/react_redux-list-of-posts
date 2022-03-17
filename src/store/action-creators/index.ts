import * as PostsActionCreators from './posts';
import * as UsersActionCreators from './users';
import * as PostCommentsActionCreators from './postComments';

export default {
  ...PostsActionCreators,
  ...UsersActionCreators,
  ...PostCommentsActionCreators,
};
