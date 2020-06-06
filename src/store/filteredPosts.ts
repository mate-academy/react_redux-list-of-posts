import { AnyAction } from 'redux';
import { FILTER_FIELD_CHANGE } from './filterField';
import { LOADING_FINISH } from '.';
import { PostType } from '../types';



const reducer = (filteredPosts: PostType[] = [], action: AnyAction): PostType[] => {
  switch (action.type) {
    case FILTER_FIELD_CHANGE:
      if (action.filterField === '') {
        return [...action.posts];
      } else {
        return action.posts.filter((post: PostType) => post.body.includes(action.filterField)
          || post.title.includes(action.filterField));
      };
    case LOADING_FINISH:
      return [...action.posts]
    default:
      return filteredPosts;
  }
};

export default reducer;
