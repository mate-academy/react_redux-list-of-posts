import { AnyAction } from 'redux';
// Action types
const SET_POSTS = 'SET_POSTS';
const SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID';
const SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID';

// Action creators
export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, payload: posts });
export const setSelectedPostId = (id: number) => ({ type: SET_SELECTED_POST_ID, payload: id });
export const setSelectedUserId = (id: number) => ({ type: SET_SELECTED_USER_ID, payload: id });

const initialState: PostsListSlice = {
  posts: [{
    id: 0,
    userId: 0,
    title: '',
    body: '',
    createdAt: '',
    updatedAt: '',
  }],
  selectedPostId: 0,
  selectedUserId: 0,
};

const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_SELECTED_POST_ID:
      return {
        ...state,
        selectedPostId: action.payload,
      };

    case SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
