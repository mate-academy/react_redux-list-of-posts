import { Action } from 'redux';

const LOAD_SUCCESS = 'LOAD_SUCCESS';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

type LoadSuccess = Action<typeof LOAD_SUCCESS> & { posts: PreparedPost[] };
type RemovePost = Action<typeof REMOVE_POST> & { id: number };
type RemoveComment = Action<typeof REMOVE_COMMENT> & { id: number; postId: number };

export const loadSuccess = (posts: PreparedPost[]): LoadSuccess => ({
  type: LOAD_SUCCESS,
  posts,
});

export const removePost = (id: number): RemovePost => ({
  type: REMOVE_POST,
  id,
});

export const removeComment = (id: number, postId: number): RemoveComment => ({
  type: REMOVE_COMMENT,
  id,
  postId,
});

type PostAction = LoadSuccess | RemovePost | RemoveComment;

const postsReducer = (posts = [] as PreparedPost[], action: PostAction) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return action.posts;

    case REMOVE_POST:
      return posts.filter(post => post.id !== action.id);

    case REMOVE_COMMENT:
      return posts.map(post => ((post.id === action.postId) ? {
        ...post,
        comments: post.comments.filter(comment => comment.id !== action.id),
      } : post));

    default:
      return posts;
  }
};

export default postsReducer;
