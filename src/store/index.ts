import { createStore, AnyAction} from 'redux';

interface RootState {
  posts: Post[];
  isLoaded: boolean;
  searchValue: string;
  filteredPosts: Post[];
}

const initialState: RootState = {
  posts: [],
  isLoaded: false,
  searchValue: '',
  filteredPosts: [],
};

const SET_POSTS = 'SET_POSTS';
const SET_LOADING_STATUS = 'SET_LOAD_STATUS';
const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

export const setPosts = (posts: Post[]) => ({type: SET_POSTS, payload: posts});
export const setLoadingStatus = () => ({type: SET_LOADING_STATUS});
export const setFilteredPosts = (filteredPosts: Post[]) => ({type: SET_FILTERED_POSTS, payload: filteredPosts});
export const setSearchValue = (value: string) => ({type: SET_SEARCH_VALUE, payload: value});

export const getPosts = (state: RootState) => state.posts;
export const getLoadingStatus = (state: RootState) => state.isLoaded;
export const getSearchValue = (state: RootState) => state.searchValue;
export const getFilteredPosts = (state: RootState) => state.filteredPosts; 

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoaded: true,
      };
    case SET_FILTERED_POSTS:
      return {
        ...state,
        filteredPosts: action.payload,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
