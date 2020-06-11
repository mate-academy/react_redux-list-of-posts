import { AnyAction } from 'redux';
import { INIT_POSTS } from '../actions/types';


const postsReducer = (posts: Post[] = [], action: AnyAction): Post[] => {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts;
    default:
      return posts;
  }
};

export default postsReducer;
