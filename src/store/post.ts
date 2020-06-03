import { AnyAction } from 'redux';

// Action types
const SET_POSTS = 'SET_POSTS';
const DELETE_POSTS = 'DELETE_POSTS';
const DELETE_COMMENTS = 'DELETE_COMMENTS';

// Action creators
export const setPosts = (posts: PostProps[]) => ({ type: SET_POSTS, posts });
export const deletePosts = (postId: number) => ({ type: DELETE_POSTS, postId });
export const deleteComments
  = (postId: number, commentId: number) => ({ type: DELETE_COMMENTS, postId, commentId });

// message reducer receives only the `state.message` part, but not the entire Redux state
const reducer = (posts: PostProps[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DELETE_POSTS:
      return posts.filter(post => post.id !== action.postId);
    case DELETE_COMMENTS:
      return posts.map(post => ({
        ...post,
        comments: post.comments.filter((comment: CommentProps) => comment.id !== action.commentId),
      }));
    default:
      return posts;
  }
};

export default reducer;
