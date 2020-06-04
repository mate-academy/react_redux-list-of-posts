import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const setPosts = (posts: PreparedPost[]) => ({ type: SET_POSTS, posts });
export const removePost = (id: number) => ({ type: REMOVE_POST, id});
export const removeComment = (id: number) => ({ type: REMOVE_COMMENT, id});

const postsReducer = (posts: PreparedPost[] = [], action: AnyAction) => {
  switch(action.type) {
    case SET_POSTS:
      return action.posts;
    case REMOVE_POST:
      return posts.filter((post: PreparedPost) => post.id !== action.id)
    case REMOVE_COMMENT:
      return posts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== action.id)
      }))
    default:
      return posts;
  }
}

export default postsReducer;

