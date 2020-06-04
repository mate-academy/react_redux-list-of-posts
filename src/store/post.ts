import { AnyAction } from 'redux';

// Action types
const SET_POSTS = 'SET_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

// Action creators

export const setPosts = (posts: PostFromServer[]) => ({ type: SET_POSTS, posts });
export const removePost = (postsId: number) => ({ type: REMOVE_POST, postsId });
export const removeComment = (postsId: number, commentId: number) => (
  {
    type: REMOVE_COMMENT,
    postsId,
    commentId,
  });

// posts reducer receives only the `posts.message` part, but not the entire Redux state
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

// import { AnyAction } from 'redux';

// // Action types
// const SET_POSTS = 'SET_POSTS';
// const DELETE_POST = 'DELETE_POSTS';
// const DELETE_COMMENT = 'DELETE_COMMENTS';

// // Action creators
// export const setPosts = (posts: PostProps[]) => ({ type: SET_POSTS, posts });
// export const deletePost = (postId: number) => ({ type: DELETE_POST, postId });
// export const deleteComment = (postId: number, commentId: number) => ({
//   type: DELETE_COMMENT,
//   postId,
//   commentId,
// });

// const reducer = (posts: PostProps[] = [], action: AnyAction) => {
//   switch (action.type) {
//     case SET_POSTS:
//       return action.posts;
//     case DELETE_POST:
//       return posts.filter(post => post.id !== action.postId);
//     case DELETE_COMMENT:
//       return posts.map(post => ({
//         ...post,
//         comments: post.comments
//           .filter((comment: CommentProps) => comment.id !== action.commentId),
//       }));
//     default:
//       return posts;
//   }
// };

// export default reducer;
