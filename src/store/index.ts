import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

export const START_LOADING_DATA = 'START_LOADING_DATA';
export const SUCCESSFUL_LOADING = 'SUCCESSFUL_LOADING';
export const HANDLE_ERROR_LOADING = 'HANDLER_ERROR_LOADING';
export const SET_QUERY = 'SET_QUERY';
export const REMOVE_POST = 'REMOVE_POST';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
// const rootReducer = combineReducers({
//   loading: loadingReducer,
//   message: messageReducer,
// });

// We automatically get types returned by concrete reducers
// export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
// export const isLoading = (state: RootState) => state.loading;
// export const getMessage = (state: RootState) => state.message;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */

export type RootState = {
  posts: [];
  isLoading: boolean;
  hasErrors: boolean;
  query: string;
};

const initialState = {
  posts: [],
  isLoading: false,
  hasErrors: false,
  query: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING_DATA:
      return {
        ...state,
        isLoading: true,
        hasErrors: false,
      };
    case SUCCESSFUL_LOADING:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
      };
    case HANDLE_ERROR_LOADING:
      return {
        ...state,
        isLoading: false,
        hasErrors: true,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: Post) => post.id !== action.postId),
      };

    default:
      return state;
  }
};

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
