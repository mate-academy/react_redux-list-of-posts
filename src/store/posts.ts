import { Dispatch, AnyAction } from "redux";
import { request } from "../helpers/api";

// Action types
const GET_TODOS = "GET_TODOS";
const UPDATE_ACTIVE_POST_ID = "UPDATE_ACTIVE_POST_ID";
const UPDATE_ACTIVE_USER_ID = "UPDATE_ACTIVE_USER_ID";

// Action creators
export const getPosts = (posts: any[]) => ({ type: GET_TODOS, posts });

export const fetchPosts = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => (dispatch: Dispatch) => {
  setIsLoading(true);
  request("posts").then((res) => {
    dispatch(getPosts(res.data));
    setIsLoading(false);
  });
};

export const updatePostId = (id: number) => ({
  type: UPDATE_ACTIVE_POST_ID,
  id,
});

export const updateUsertId = (id: number) => ({
  type: UPDATE_ACTIVE_USER_ID,
  id,
});

export type RootState = {
  posts: any[];
  postId: number;
  userId: number;
};

const initialState: RootState = {
  posts: [],
  postId: 0,
  userId: 0,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, posts: action.posts };

    case UPDATE_ACTIVE_POST_ID:
      return { ...state, postId: action.id };

    case UPDATE_ACTIVE_USER_ID:
      return { ...state, userId: action.id };

    default:
      return state;
  }
};

export default reducer;
