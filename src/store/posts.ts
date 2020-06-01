import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_COMM = 'DELETE_COMM';
const DELETE_POST = 'DELETE_POST';

export const setPostsData = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const deleteComm = (commId: number) => ({ type: DELETE_COMM, commId });
export const deletePost = (postId: number) => ({ type: DELETE_POST, postId });

const postReducer = (state = [] as Post[], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case DELETE_COMM:
      return state.map(post => ({
        ...post,
        comments: post.comments.filter(comm => comm.id !== action.commId),
      }));

    case DELETE_POST:
      return state.filter(post => post.id !== action.postId);

    default:
      return state;
  }
};

export default postReducer;
