import { AnyAction } from 'redux';

const SET_USER_ID = 'SET_USER_ID';
const SET_POSTS = 'SET_POSTS';
const SET_USERS_LIST = 'SET_USERS_LIST';
const SET_LOADING = 'SET_LOADING';

export type PostsState = {
  isLoading: boolean;
  userId: number;
  posts: Post[];
  usersList: User[]
};

const initialState: PostsState = {
  isLoading: false,
  userId: 0,
  posts: [],
  usersList: [],
};

export const actions = {
  setUserId: (userId: number) => ({ type: SET_USER_ID, userId }),
  setPosts: (posts: Post[]) => ({ type: SET_POSTS, posts }),
  setUsersList: (usersList: User[]) => ({ type: SET_USERS_LIST, usersList }),
  setLoading: (isLoading: boolean) => ({ type: SET_LOADING, isLoading }),
};

export const selectors = {
  getPosts: (state: PostsState) => state.posts,
  getUserList: (state: PostsState) => state.usersList,
  getLoadingStatus: (state: PostsState) => state.isLoading,
  getUserId: (state: PostsState) => state.userId,
};

const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.userId };
    case SET_POSTS:
      return { ...state, posts: action.posts };
    case SET_USERS_LIST:
      return { ...state, usersList: action.usersList };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };

    default:
      return state;
  }
};

export default postsReducer;
