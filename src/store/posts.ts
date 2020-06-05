import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_POST = 'DELETE_POST';


export const setPosts = (posts: DataPost[]) => ({ type: SET_POSTS, posts });
export const deleteComment = (id: number) => ({ type: DELETE_COMMENT, id });
export const deletePost = (id: number) => ({ type: DELETE_POST, id });

const postsReducer = (posts: DataPost[] = [], action: AnyAction): DataPost[] => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.id);

    case DELETE_COMMENT:
      return  posts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== action.id),
      }));
      
    default:
      return posts;
  }
};

export default postsReducer;
