import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getPosts, getUsers, getComments } from './api';

const ACTION_TYPE_SET_POSTS = 'SET_POSTS';
const ACTION_TYPE_START_LOADING = 'START_LOAADING';
const ACTION_TYPE_CHANGE_CONTENT = 'CHANGE_CONTENT';
const ACTION_TYPE_DELETE_POST = 'DELETE_POST';
const ACTION_TYPE_DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = posts => ({
  type: ACTION_TYPE_SET_POSTS,
  posts,
});

export const startLoading = () => ({
  type: ACTION_TYPE_START_LOADING,
});

export const changeContent = () => ({
  type: ACTION_TYPE_CHANGE_CONTENT,
});

export const deletePost = idPost => ({
  type: ACTION_TYPE_DELETE_POST,
  idPost,
});

export const deleteComment = idComment => ({
  type: ACTION_TYPE_DELETE_COMMENT,
  idComment,
});

export const loadPosts = () => {
  return async(dispatch) => {
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
};

const initialState = {
  posts: [],
  loadingButton: 'Load list of posts',
  visibleContent: false,
};

const rootReduce = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case ACTION_TYPE_START_LOADING:
      return {
        ...state,
        loadingButton: 'Loading...',
      };
    case ACTION_TYPE_CHANGE_CONTENT:
      return {
        ...state,
        visibleContent: true,
      };
    case ACTION_TYPE_DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.idPost),
      };
    case ACTION_TYPE_DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => ({
          ...post,
          comments: post.comments
            .filter(comment => comment.id !== action.idComment),
        })),
      };

    default:
      return state;
  }
};

const store = createStore(rootReduce, initialState, applyMiddleware(thunk));

export default store;
