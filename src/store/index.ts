import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import { createSelector } from 'reselect';
import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './posts';
import queryReducer from './query';
import { getAll } from '../helpers/api';


const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  message: messageReducer,
  query: queryReducer,
});

export type RootState = {
  loading: {
    loading: boolean;
    visible: boolean;
  };
  message: string;
  posts: Post[];
  query: string;
};

export const isLoading = (state: RootState) => state.loading.loading;
export const isVisible = (state: RootState) => state.loading.visible;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;

export const getVisiblePosts = createSelector(
  getPosts,
  getQuery,

  (posts: Post[], query: string) => {
    return posts.filter(post => (post.body + post.title)
      .toLowerCase()
      .includes(query.toLowerCase()));
  },
);

export const loadMessage = () => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());

    try {
      const postFromServer = await getAll<Post>('posts.json');
      const usersFromServer = await getAll<User>('users.json');
      const commentsFromServer = await getAll<Comment>('comments.json');

      const preparedPosts = postFromServer.map((post: Post) => {
        const user = usersFromServer.find((currentUser: User) => currentUser.id === post.userId);
        const userComments = commentsFromServer
          .filter((comment: Comment) => (comment.postId === post.id));

        return {
          ...post,
          user,
          userComments,
        };
      });

      dispatch(setMessage('Data was received'));
      dispatch(setPosts(preparedPosts));
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
