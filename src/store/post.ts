import { Dispatch, AnyAction } from "redux";
import { request, remove, post } from "../helpers/api";
import { Post, Comment, RootStatePost } from "../types";

// Action types
const SET_POST = "SET_POST";
const SET_COMMENTS = "SET_COMMENTS";

// Action creators
export const setPost = (post: Post) => ({
  type: SET_POST,
  post,
});

export const setComments = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  comments,
});

export const removeComment = (id: number) => {
  return new Promise((resolve: any) => {
    remove(`comments/${id}`);
    setTimeout(() => resolve(), 1000);
  });
};

export const addComment = (
  options: Comment & { name: string; email: string }
) => post("comments", options);

export const fetchPostInfo = (
  id: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => (dispatch: Dispatch) => {
  Promise.all([request(`posts/${id}`), request(`comments/?postId=${id}`)]).then(
    ([post, comments]) => {
      dispatch(setPost(post.data));
      dispatch(setComments(comments.data));
      setIsLoading(false);
    }
  );
};

const initialState: RootStatePost = {
  post: null,
  comments: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POST:
      return { ...state, post: action.post };

    case SET_COMMENTS:
      return { ...state, comments: action.comments };

    default:
      return state;
  }
};

export default reducer;
