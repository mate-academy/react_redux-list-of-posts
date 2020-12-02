import { Dispatch, AnyAction } from "redux";
import { request, remove, post } from "../helpers/api";
import { IPost, IComment } from "../Interfaces";

// Action types
const SET_POST = "SET_POST";
const SET_COMMENTS = "SET_COMMENTS";

// Action creators
export const getPost = (post: IPost) => ({ type: SET_POST, post });

export const getComments = (comments: IComment[]) => ({
  type: SET_COMMENTS,
  comments,
});

export const removeComment = (id: number) => {
  return new Promise((resolve) => {
    remove(`comments/${id}`);
    setTimeout(() => resolve(), 1000);
  });
};

export const addComment = (
  options: IComment & { name: string; email: string }
) => post("comments", options);

export const fetchPostInfo = (
  id: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => (dispatch: Dispatch) => {
  setIsLoading(true);

  Promise.all([request(`posts/${id}`), request(`comments/?postId=${id}`)]).then(
    ([post, comments]) => {
      dispatch(getPost(post.data));
      dispatch(getComments(comments.data));
      setIsLoading(false);
    }
  );
};

export type RootState = {
  post: IPost | null;
  comments: IComment[];
};

const initialState: RootState = {
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
