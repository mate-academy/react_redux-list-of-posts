import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const setPosts = (posts: Post[]) => (
  {
    type: SET_POSTS,
    posts,
  }
);

export const removePost = (postId: number) => (
  {
    type: REMOVE_POST,
    postId,
  }
);

export const removeComment = (postId: number, commentId: number) => (
  {
    type: REMOVE_COMMENT,
    postId,
    commentId,
  }
);

const reducer = (posts: PreparedPost[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case REMOVE_POST:
      return posts.filter(post => post.id !== action.postId);
    case REMOVE_COMMENT:
      return posts.map(post => {
        if (post.id === action.postId) {
          return {
            ...post,
            comments: post.comments
              .filter((comment: Comment) => comment.id !== action.commentId),
          };
        }

        return post;
      });

    default:
      return posts;
  }
};

export default reducer;
