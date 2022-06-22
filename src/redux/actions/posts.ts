import { addComment, deleteComment } from '../../helpers/api';
import { ActionTypes } from '../../types/ActionTypes';
import { CommentType, NewComment } from '../../types/CommentType';
import { Details } from '../../types/Details';
import { Post } from '../../types/Post';

export const setPosts = (postsList: Post) => ({
  type: ActionTypes.SET_POSTS,
  payload: {
    postsList,
  },
});

export const setActivePost = (activePost: number | null) => ({
  type: ActionTypes.SET_ACTIVE_POST,
  payload: {
    activePost,
  },
});

export const setPostDetails = (postDetails: Details) => ({
  type: ActionTypes.SET_DETAILS,
  payload: {
    postDetails,
  },
});

export const setComments = (comments: CommentType[]) => ({
  type: ActionTypes.SET_COMMENTS,
  payload: {
    comments,
  },
});

export const addNewComment = (commentData: NewComment) => {
  // eslint-disable-next-line
  return (dispatch: any) => {
    addComment(commentData)
      .then(() => {
        dispatch({
          type: ActionTypes.ADD_COMMENT,
          payload: {
            commentData,
          },
        });
      });
  };
};

// eslint-disable-next-line
export const deleteCommentAction = (commentId: number) => (dispatch: any) => {
  deleteComment(commentId)
    .then(() => {
      dispatch({
        type: ActionTypes.DELETE_COMMENT,
        payload: {
          commentId,
        },
      });
    });
};
