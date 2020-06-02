import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import initialReducer, { setLoaded } from './initial';
import errordReducer, { setErrorMessage } from './error';
import postReducer, { setPosts, deleteComment } from './posts';
import { getData } from '../helpers/api';

const rootReducer = combineReducers({
  initial: initialReducer,
  loading: loadingReducer,
  errorMessage: errordReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const isLoaded = (state: RootState) => state.initial;
export const getError = (state: RootState) => state.errorMessage;
export const getPosts = (state: RootState) => state.posts;
export { deleteComment };

export const loadPosts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const [posts, users, comments] = await Promise.all([
        getData<PostFromServer>('posts.json'),
        getData<User>('users.json'),
        getData<Comment>('comments.json'),
      ]);

      const preparedPosts = posts.map((post: Post) => ({
        ...post,
        user: users.find((user: User) => user.id === post.userId),
        comments: comments.filter((comment: Comment) => comment.postId === post.id),
      }));

      dispatch(setPosts(preparedPosts));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(setErrorMessage(`Error occurred when loading data: ${error}`));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
