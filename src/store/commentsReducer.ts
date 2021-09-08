import { AnyAction, Dispatch } from 'redux';

import { Comment, CommentsEdit } from '../types';
import { getPostComments, addPostComment, removePostComment, editPostComment } from '../api/comments';

export interface RootStateComments {
  comments: Comment[] | null;
  commentsEdit: CommentsEdit;
  commentEdit: Comment | null;
  commentsHidden: boolean;
  commentsUpdated: boolean;
};

const initialState: RootStateComments = {
  comments: null,
  commentsEdit: [],
  commentEdit: null,
  commentsHidden: false,
  commentsUpdated: false,
};

const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
const SET_NEW_COMMENT = 'SET_NEW_COMMENT';
const SET_COMMENTS_HIDDEN = 'SET_COMMENTS_HIDDEN';
const SET_COMMENTS_UPDATED = 'SET_COMMENTS_UPDATED';
const SET_COMMENTS_EDIT = 'SET_COMMENTS_EDIT';
const SET_COMMENT_EDIT = 'SET_COMMENT_EDIT';

// Action creators
export const setPostComments = (comments: Comment[] | null) => ({ type: SET_POST_COMMENTS, comments });
export const setNewComment = (comment: Comment) => ({ type: SET_NEW_COMMENT, comment });
export const setCommentsEdit = (commentId: number) => ({ type: SET_COMMENTS_EDIT, commentId });
export const setCommentEdit = (commentEdit: Comment | null) => ({ type: SET_COMMENT_EDIT, commentEdit });
export const setCommentsHidden = (commentsHidden: boolean) => ({ type: SET_COMMENTS_HIDDEN, commentsHidden });
export const setCommentsUpdated = (commentsUpdated: boolean) => ({ type: SET_COMMENTS_UPDATED, commentsUpdated });

export const fetchPostComments = (postId: number) => (dispatch: Dispatch) => {
  getPostComments(postId)
    .then((res: Comment[] | null) => {
      if (res) {
        dispatch(setPostComments(res));
      } else {
        dispatch(setPostComments(null));
      }
    });
};

export const addComment = (comment: Comment) => {
  console.log('POST');
  addPostComment(comment);
};

export const editComment = (commentId: number, comment: Comment) => {
  console.log('PATCH');
  editPostComment(commentId, comment);
};

export const removeComment = (commentId: number) => {
  console.log('DELETE', commentId);
  removePostComment(commentId);
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

// const updatePostCommentsEdit= (commentsIds: CommentsEdit, newCommentId: number) => {
//   if (!commentsIds.length) {
//     return [];
//   }

//   return commentsIds.map(commentId => {
//     if (commentId !== newCommentId) {
//       return newCommentId;
//     }

//     return [
//       ...commentsIds
//     ]
//   })
// }

export const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };

    case SET_COMMENTS_EDIT:
      console.log('11 action.commentId', action.commentId)
      return {
        ...state,
        commentsEdit: [
          ...state.commentsEdit,
          action.commentId
        ]
      }

    case SET_COMMENT_EDIT:
      console.log('commentEdit', action.commentEdit)
      return {
        ...state,
        commentEdit: action.commentEdit
      };

    case SET_NEW_COMMENT:
      return {
        ...state,
        comments: updatePostComments(state.comments, action.comment),
      };

    case SET_COMMENTS_HIDDEN:
      console.log(action.commentsHidden, 'action.commentsHidden');
      return {
        ...state,
        commentsHidden: action.commentsHidden
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
