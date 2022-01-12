import { Dispatch } from 'redux';
import { API } from '../helpers/api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { PostsState, PostActions, PostsActionsEnum } from './types/posts';

const initialState: PostsState = {
  posts: [],
  loadingPosts: false,
  errorPosts: null,
  postDetails: null,
  commentsPost: [],
};
// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const PostsActionsCreator = {
  setPosts: (payload: Post[]) => ({ type: PostsActionsEnum.SET_POSTS, payload }),
  fetchPosts() {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(PostsActionsCreator.fetchPostsLoading());
        const response = await API.getPosts();

        dispatch(PostsActionsCreator.setPosts(response));
      } catch (e) {
        const errMessages = 'Прозошла ошибака при загрузке постов. Попробуйте позже!';

        dispatch(PostsActionsCreator.fetchErrorPosts(errMessages));

        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
  },
  fetchErrorPosts: (payload: null | string) => {
    return ({ type: PostsActionsEnum.FETCH_POSTS_ERROR, payload });
  },
  fetchPostsLoading: () => ({ type: PostsActionsEnum.FETCH_POSTS_LOADING }),
  SetDetailsPost: (payload: Post) => ({ type: PostsActionsEnum.SET_DETAILS_POST, payload }),
  fetchDetailsPost(id: string | number) {
    return async (dispatch: Dispatch) => {
      try {
        const data = await API.getPostDetails(id);

        dispatch(PostsActionsCreator.SetDetailsPost(data));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
  },
  setCommentsPost: (payload: Comment[]) => ({ type: PostsActionsEnum.SET_COMMENTS_POST, payload }),
  fetchCommentsPost(id: number | string) {
    return async (dispatch: Dispatch) => {
      try {
        const comments = await API.getPostComments(id);

        dispatch(PostsActionsCreator.setCommentsPost(comments));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
  },
  setNewComment: (payload: Comment) => ({ type: PostsActionsEnum.SET_NEW_COMMENT, payload }),
  sendComments(comment: Partial<Comment>) {
    return async (dispatch: Dispatch) => {
      const backComment = await API.addComment(comment);

      dispatch(PostsActionsCreator.setNewComment(backComment));
    };
  },
  deleteComment: (id: number) => ({ type: PostsActionsEnum.DELETE_COMMENT, payload: id }),
  deleteFetchComment(id: number) {
    return async (dispatch: Dispatch) => {
      await API.deleteComment(id);

      dispatch(PostsActionsCreator.deleteComment(id));
    };
  },
};

export const postsReducer = (state = initialState, action: PostActions): PostsState => {
  switch (action.type) {
    case PostsActionsEnum.SET_POSTS:
      return {
        ...state,
        loadingPosts: false,
        posts: action.payload,
      };

    case PostsActionsEnum.FETCH_POSTS_LOADING:
      return {
        ...state,
        loadingPosts: true,
      };

    case PostsActionsEnum.FETCH_POSTS_ERROR:
      return {
        ...state,
        loadingPosts: false,
        errorPosts: action.payload,
      };

    case PostsActionsEnum.SET_DETAILS_POST:
      return {
        ...state,
        postDetails: action.payload,
      };

    case PostsActionsEnum.SET_COMMENTS_POST:
      return {
        ...state,
        commentsPost: action.payload,
      };

    case PostsActionsEnum.SET_NEW_COMMENT:
      return {
        ...state,
        commentsPost: [...state.commentsPost, action.payload],
      };

    case PostsActionsEnum.DELETE_COMMENT:
      return {
        ...state,
        commentsPost: state.commentsPost.filter((comment: Comment) => {
          return comment.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};
