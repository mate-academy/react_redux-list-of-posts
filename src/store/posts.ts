import { AnyAction } from 'redux';

const DELETE_POST = 'DELETE_POST';
const FINISH_LOADING = 'FINISH_LOADING';

export const deletePost = (value: number) => ({type: DELETE_POST, value});

const postsReducer = (posts: PostWithUser[] = [], action: AnyAction): PostWithUser[] => {
  switch (action.type) {
    case FINISH_LOADING:
      return action.posts;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.value);

    default:
      return posts;
  }
};

export default postsReducer;
