import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const ACTION_TYPES = {
  POSTS_ADD: 'POSTS::ADD',
  SWITCH_LOADING: 'SWITCH::LOADING',
  POSTS_INITIALIZE: 'POSTS::INITIALIZE',
  ERROR_HANDLE: 'ERROR::HANDLE',
  SORTED_POSTS_ADD: 'SORTED_POSTS::ADD',
  POST_DELETE: 'POST::DELETE',
  TEXT_ADD: 'TEXT::ADD',
  POSTS_SORT: 'POST::SORT',
  FILTERED_POSTS_RESET: 'FILTERED_POSTS::RESET',
  COMMENT_DELETE: 'COMMENT::DELETE',
};

export const deletePost = idPost => ({
  type: ACTION_TYPES.POST_DELETE,
  payload: idPost,
});

export const deleteComment = (idComment, idPost) => ({
  type: ACTION_TYPES.COMMENT_DELETE,
  payload: idComment,
  idPost,
});

export const addPosts = posts => ({
  type: ACTION_TYPES.POSTS_ADD,
  payload: posts,
});

export const resetFilter = () => ({
  type: ACTION_TYPES.FILTERED_POSTS_RESET,
});

export const addTextForFilter = text => ({
  type: ACTION_TYPES.TEXT_ADD,
  payload: text,
});

export const sortPosts = (eventSubmit) => {
  eventSubmit.preventDefault();

  return {
    type: ACTION_TYPES.POSTS_SORT,
  };
};

export const addSortedPosts = postsSorted => ({
  type: ACTION_TYPES.SORTED_POSTS_ADD,
  payload: postsSorted,
});

export const switchLoading = isLoading => ({
  type: ACTION_TYPES.SWITCH_LOADING,
  payload: isLoading,
});

export const initialized = isInitialized => ({
  type: ACTION_TYPES.POSTS_INITIALIZE,
  payload: isInitialized,
});

export const errorPosts = hasError => ({
  type: ACTION_TYPES.ERROR_HANDLE,
  payload: hasError,
});

export const receivePosts = () => (dispatch) => {
  dispatch(switchLoading(true));
  dispatch(initialized(true));
  dispatch(errorPosts(false));

  Promise.all([
    fetch(`${BASE_URL}posts`),
    fetch(`${BASE_URL}users`),
    fetch(`${BASE_URL}comments`),
  ])
    .then(([responsePosts, responseUsers, responseComments]) => Promise
      .all([
        responsePosts.json(),
        responseUsers.json(),
        responseComments.json(),
      ]))
    .then(([posts, users, comments]) => {
      const usersMapApi = users
        .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

      function getFullPosts(postsArg, commentsArg, usersMapApiArg) {
        return postsArg.map(post => ({
          ...post,
          comments: commentsArg.filter(comment => comment.postId === post.id),
          user: usersMapApiArg[post.userId],
        }));
      }

      const preparedPosts = getFullPosts(posts, comments, usersMapApi);
      const sortedPosts = getFullPosts(posts, comments, usersMapApi);

      dispatch(switchLoading(false));
      dispatch(addPosts(preparedPosts));
      dispatch(addSortedPosts(sortedPosts));
    })
    .catch(() => {
      dispatch(errorPosts(true));
      dispatch(switchLoading(false));
    });
};

const initialState = {
  posts: [],
  postsSorted: [],
  isLoading: false,
  isInitialized: false,
  hasError: false,
  isSorted: false,
  templateForFilter: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.POSTS_ADD: {
      return {
        ...state,
        posts: [...action.payload],
      };
    }

    case ACTION_TYPES.POSTS_SORT: {
      const sortPostsWithTemplate = posts => (
        posts
          .filter(post => post.title.includes(state.templateForFilter)
          || post.body.includes(state.templateForFilter)));

      return {
        ...state,
        postsSorted: sortPostsWithTemplate(state.posts),
        templateForFilter: '',
      };
    }

    case ACTION_TYPES.FILTERED_POSTS_RESET: {
      return {
        ...state,
        postsSorted: [...state.posts],
      };
    }

    case ACTION_TYPES.TEXT_ADD: {
      return {
        ...state,
        templateForFilter: action.payload,
      };
    }

    case ACTION_TYPES.POST_DELETE: {
      const deletePostWithList = postWillDeleted => postWillDeleted
        .filter(post => post.id !== action.payload)

      return {
        ...state,
        posts: deletePostWithList(state.posts),
        postsSorted: deletePostWithList(state.postsSorted),
      };
    }

    case ACTION_TYPES.COMMENT_DELETE: {
      const deleteCommentWithPost = commentWillDelete => commentWillDelete
        .map((post) => {
          if (post.id === action.idPost) {
            return {
              ...post,
              comments: post.comments
                .filter(comment => comment.id !== action.payload),
            };
          }

          return post;
        });

      return {
        ...state,
        posts: deleteCommentWithPost(state.posts),
        postsSorted: deleteCommentWithPost(state.postsSorted),
      };
    }

    case ACTION_TYPES.SORTED_POSTS_ADD: {
      return {
        ...state,
        postsSorted: [...action.payload],
      };
    }

    case ACTION_TYPES.SWITCH_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ACTION_TYPES.POSTS_INITIALIZE: {
      return {
        ...state,
        isInitialized: action.payload,
      };
    }

    case ACTION_TYPES.ERROR_HANDLE: {
      return {
        ...state,
        hasError: action.payload,
      };
    }
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
