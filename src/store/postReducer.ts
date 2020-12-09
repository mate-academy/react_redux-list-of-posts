import { Dispatch, AnyAction } from "redux";
import { request, remove, post } from "../helpers/api";

export interface Comment {
  id?: number;
  postId: number;
  body: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type RootState = {
  post: Post | null;
  comments: Comment[];
};

const SET_POST = "SET_POST";
const SET_COMMENTS = "SET_COMMENTS";

export const setPost = (post: Post) => ({ 
  type: SET_POST,
  post,
});

export const setComments = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  comments,
});

export const addComment = (
  options: Comment & { name: string; email: string }
) => post("comments", options);

export const removeComment = (id: number) => {
  return new Promise((resolve) => {
    remove(`comments/${id}`);
    setTimeout(() => resolve(), 1000);
  });
};

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
