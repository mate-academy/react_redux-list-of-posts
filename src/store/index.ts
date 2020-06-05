import { createStore, Action } from 'redux';

const SET_LOADING = 'SET_LOADING';
const SET_POSTS = 'SET_POSTS';
const INPUT_VALUE = 'INPUT_VALUE';
const SET_DEBOUNCE_INPUT_VALUE = 'SET_DEBOUNCE_INPUT_VALUE';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

type SetLoading = Action<typeof SET_LOADING> & {
  loadingStatus: boolean;
};

type SetPosts = Action<typeof SET_POSTS> & {
  posts: PostWithUserAndComment[];
};

type ChangeInputValue = Action<typeof INPUT_VALUE> & {
  inputValue: string;
};

type ChangeDebounceInputValue = Action<typeof SET_DEBOUNCE_INPUT_VALUE> & {
  debounceInputValue: string;
};

type DeletePost = Action<typeof DELETE_POST> & {
  postId: number;
};

type DeleteComment = Action<typeof DELETE_COMMENT> & {
  commentId: number;
};

export type AllActions = SetLoading
| SetPosts
| ChangeInputValue
| ChangeDebounceInputValue
| DeletePost
| DeleteComment;

export const setLoading = (loadingStatus: boolean): SetLoading => (
  {
    type: SET_LOADING,
    loadingStatus,
  }
);
export const setPosts = (posts: PostWithUserAndComment[]): SetPosts => (
  {
    type: SET_POSTS,
    posts,
  }
);
export const changeInputValue = (inputValue: string): ChangeInputValue => (
  {
    type: INPUT_VALUE,
    inputValue,
  }
);

export const changeDebounceInputValue = (
  debounceInputValue: string,
): ChangeDebounceInputValue => (
  {
    type: SET_DEBOUNCE_INPUT_VALUE,
    debounceInputValue,
  }
);

export const deletePost = (postId: number): DeletePost => (
  {
    type: DELETE_POST,
    postId,
  }
);

export const deleteComment = (commentId: number): DeleteComment => (
  {
    type: DELETE_COMMENT,
    commentId,
  }
)

export type InitialState = {
  posts: PostWithUserAndComment[];
  inputValue: string;
  debounceInputValue: string;
  loadingStatus: boolean;
};

const initialState: InitialState = {
  posts: [],
  inputValue: '',
  debounceInputValue: '',
  loadingStatus: false,
};

const postsReducer = (state = initialState, action: AllActions) => {
  switch (action.type) {
    case SET_LOADING: return {
      ...state,
      setLoading: action.loadingStatus,
    };
    case SET_POSTS: return {
      ...state,
      posts: action.posts,
    };
    case INPUT_VALUE: return {
      ...state,
      inputValue: action.inputValue,
    };
    case SET_DEBOUNCE_INPUT_VALUE: return {
      ...state,
      debounceInputValue: action.debounceInputValue,
    };
    case DELETE_POST: return {
      ...state,
      posts: [...state.posts].filter(post => post.id !== action.postId),
    };
    case DELETE_COMMENT: return {
      ...state,
      posts: [...state.posts].map(post => (
        {
          ...post,
          comments: post.comments.filter(comment => (
            comment.id !== action.commentId
          )),
        }
      )),
    };
    default: return state;
  }
};

export const filteredPosts = (state: InitialState): PostWithUserAndComment[] => {
  if (!state.inputValue) {
    return state.posts;
  }

  return [...state.posts].filter((post) => {
    const string = (post.title + post.body).toLowerCase();

    return string.includes(state.debounceInputValue.trim());
  });
};

const store = createStore(postsReducer);

export default store;
