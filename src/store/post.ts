import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const setPosts = (posts: PostFromServer[]) => ({ type: SET_POSTS, posts });
export const removePost = (postsId: number) => ({ type: REMOVE_POST, postsId });
export const removeComment = (postsId: number, commentId: number) => (
  {
    type: REMOVE_COMMENT,
    postsId,
    commentId,
  });

const reducer = (posts: PostFromServer[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case REMOVE_POST:
      return posts.filter(post => post.id !== action.postsId);
    case REMOVE_COMMENT:
      return posts.map(post => ({
        ...post,
        comments: post.comments
          .filter((commentItem: Comment) => commentItem.id !== action.commentId),
      }));
    default:
      return posts;
  }
};

export default reducer;
