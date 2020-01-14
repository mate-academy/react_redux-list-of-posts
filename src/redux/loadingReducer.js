import { getPosts, getUsers, getComments } from '../api';
import { setPosts } from './postsReducer';
import { changeContent } from './changeVisibleContent';

const ACTION_TYPE_START_LOADING = 'START_LOAADING';

export const startLoading = () => ({
  type: ACTION_TYPE_START_LOADING,
});

export const loadPosts = () => async(dispatch) => {
  dispatch(startLoading());

  const [postsList, usersList, commentsList] = await
  Promise.all([getPosts(), getUsers(), getComments()]);

  const allList = postsList.map(post => ({
    ...post,
    user: usersList.find(user => user.id === post.userId),
    comments: commentsList.filter(str => str.postId === post.id),
  }));

  dispatch(setPosts(allList));
  dispatch(changeContent());
};

const loadingReducer = (loadingButton = 'Load list of posts', action) => {
  switch (action.type) {
    case ACTION_TYPE_START_LOADING:
      return 'Loading...';

    default:
      return loadingButton;
  }
};

export default loadingReducer;
