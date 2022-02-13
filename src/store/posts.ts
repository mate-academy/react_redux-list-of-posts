import { Action } from "redux";

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

type SetPostsAction = Action<typeof SET_POSTS> & {
  posts: Post[]
};

type DeletePostAction = Action<typeof DELETE_POST> & {
  id: number
};

type DeleteCommentAction = Action<typeof DELETE_COMMENT> & {
  postId: number,
  commentId: number,
};

export const setPosts = (posts: Post[]): SetPostsAction => {
  return {
    type: SET_POSTS,
    posts
  }
}

export const deletePost = (id: number): DeletePostAction => ({
  type: DELETE_POST,
  id
});

export const deleteComment = (postId: number, commentId: number): DeleteCommentAction => ({
  type: DELETE_COMMENT,
  postId,
  commentId
});

type AllowedActions = SetPostsAction
  | DeletePostAction
  | DeleteCommentAction;


const reducer = (posts: Post[] = [], action: AllowedActions): Post[] => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.id);

    case DELETE_COMMENT:
      return posts.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: post.comments
              .filter(comment => comment.id !== action.commentId)
          } : post));

    default:
      return posts;
  }
}

export default reducer;
