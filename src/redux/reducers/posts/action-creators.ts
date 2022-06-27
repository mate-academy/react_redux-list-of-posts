import { addComment, deleteComment } from '../../../helpers/api';
import { CommentType, NewComment } from '../../../types/CommentType';
import { Details } from '../../../types/Details';
import { Post } from '../../../types/Post';
import {
  ActionTypes,
  SetActivePostAction,
  SetPostsAction,
} from './types';

export const PostsActionCreators = {
  setPosts: (postsList: Post): SetPostsAction => ({
    type: ActionTypes.SET_POSTS,
    payload: postsList,
  }),
  setActivePost: (activePost: number | null): SetActivePostAction => ({
    type: ActionTypes.SET_ACTIVE_POST,
    payload: activePost,
  }),
  setPostDetails: (postDetails: Details) => ({
    type: ActionTypes.SET_DETAILS,
    payload: postDetails,
  }),
  setComments: (comments: CommentType[]) => ({
    type: ActionTypes.SET_COMMENTS,
    payload: comments,
  }),
  // eslint-disable-next-line
  addNewComment: (commentData: NewComment) => (dispatch: any) => {
    addComment(commentData)
      .then(() => {
        dispatch({
          type: ActionTypes.ADD_COMMENT,
          payload: commentData,
        });
      });
  },
  // eslint-disable-next-line
  deleteCommentAction: (commentId: number) => (dispatch: any) => {
    deleteComment(commentId)
      .then(() => {
        dispatch({
          type: ActionTypes.DELETE_COMMENT,
          payload: commentId,
        });
      });
  },
};
