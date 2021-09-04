import { AnyAction, Dispatch } from 'redux';

import { Comment } from '../types';
import { request, add, remove } from "../helpers/api";

export interface RootStateComments {
  comments: Comment[] | null;
  commentsUpdated: boolean;
};

const initialState: RootStateComments = {
  comments: null,
  commentsUpdated: false,
};

const SET_POST_COMMENTS = "SET_POST_COMMENTS";
const SET_NEW_COMMENT = "SET_NEW_COMMENT";
const SET_COMMENTS_UPDATED = "SET_COMMENTS_UPDATED";

// Action creators

// Selectors - a function receiving Redux state and returning some data from it
export const setPostComments = (comments: Comment[] | null) => ({ type: SET_POST_COMMENTS, comments });
export const setNewComment = (comment: Comment) => ({ type: SET_NEW_COMMENT, comment });
export const setCommentsUpdated = (commentsUpdated: boolean) => ({ type: SET_COMMENTS_UPDATED, commentsUpdated });

export const fetchPostComments = (
  postId: number,
) => (dispatch: Dispatch) => {
  console.log(postId);
  request(`comments?postId=${postId}`).then((res: any) => {
    dispatch(setPostComments(res.data));
  });
};

export const addPostComment = (comment: Comment) => {
  console.log('POST');
  add('comments', comment);
};

export const removePostComment = (commentId: number) => {
  console.log('DELETE', commentId);
  remove(`comments/${commentId}`);
}

const updatePostComments= (comments: Comment[] | null, newComment: Comment) => {
  if (!comments) {
    return null;
  }

  return comments.map(comment => {
    if (comment.id !== newComment.id) {
      return newComment;
    }

    return {
      ...comment
    }
  })
}

export const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };

    case SET_NEW_COMMENT:
      return {
        ...state,
        comments: updatePostComments(state.comments, action.comment),
        // comments: [
        //   ...state.comments,
        //   action.comment
        // ]
      };

    case SET_COMMENTS_UPDATED:
      return {
        ...state,
        commentsUpdated: action.commentsUpdated
      };

    default:
      return state;
  }
}
