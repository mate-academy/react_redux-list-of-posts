import {createStore, AnyAction} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const INIT_POSTS = 'INIT_TODOS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const DELETE_POST = 'DELETE_POST';
const SET_QUERY = 'SET_QUERY';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';

export const startLoading = () => ({type: START_LOADING});
export const initPosts = (posts: {
  postUser: UserFromServer
    | undefined; postComment: CommentFromServer[];
  id: number; title: string; body: string; userId: number;
}[]) => ({
  type: INIT_POSTS,
  posts,
});
export const handleError = (errorMessage: string) => ({
  type: HANDLE_ERROR,
  errorMessage,
});
export const deletePost = (postTitle: string) => ({
  type: DELETE_POST,
  postTitle,
});
export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query,
});
export const setFilterQuery = (filterQuery: string) => ({
  type: SET_FILTER_QUERY,
  filterQuery,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getPosts = (state: RootState) => state.posts;
export const isLoading = (state: RootState) => state.loading;
export const hasError = (state: RootState) => state.errorMessage;
export const getQuery = (state: RootState) => state.query;
export const getVisiblePosts = (state: RootState) => {
  return state.posts.filter(({title, body}) => (`${title} ${body}`)
    .toLocaleLowerCase()
    .replace(/\s*/g, ' ')
    .includes(state.filterQuery.toLocaleLowerCase().replace(/\s*/g, ' ')));
};

// Initial state
export type RootState = {
  posts: Post[];
  loading: boolean;
  errorMessage: string;
  query: string;
  filterQuery: string;
};

const initialState: RootState = {
  posts: [],
  loading: false,
  errorMessage: '',
  query: '',
  filterQuery: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };

    case INIT_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.title !== action.postTitle),
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case SET_FILTER_QUERY:
      return {
        ...state,
        filterQuery: action.filterQuery,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
