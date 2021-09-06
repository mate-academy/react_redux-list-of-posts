import { AnyAction, Dispatch } from 'redux';

import { Comment, CommentsEdit } from '../types';
import { request, add, remove } from '../helpers/api';

export interface RootStateComments {
  comments: Comment[] | null;
  commentsEdit: CommentsEdit;
  commentsUpdated: boolean;
  commentsCount: number;
};

const initialState: RootStateComments = {
  comments: null,
  commentsEdit: [],
  commentsUpdated: false,
  commentsCount: 0,
};

const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
const SET_NEW_COMMENT = 'SET_NEW_COMMENT';
const SET_COMMENTS_UPDATED = 'SET_COMMENTS_UPDATED';
const SET_COMMENTS_EDIT = 'SET_COMMENTS_EDIT';
const SET_COMMENTS_COUNT = 'SET_COMMENTS_COUNT';

// Action creators
export const setPostComments = (comments: Comment[] | null) => ({ type: SET_POST_COMMENTS, comments });
export const setNewComment = (comment: Comment) => ({ type: SET_NEW_COMMENT, comment });
export const setCommentsEdit = (commentId: number) => ({ type: SET_COMMENTS_EDIT, commentId });
export const setCommentsUpdated = (commentsUpdated: boolean) => ({ type: SET_COMMENTS_UPDATED, commentsUpdated });
export const setPostCommentsCount = (commentsCount: number) => ({ type: SET_COMMENTS_COUNT, commentsCount });

export const fetchPostComments = (postId: number) => (dispatch: Dispatch) => {
  request(`comments?postId=${postId}`)
    .then((res: {data: Comment[] | null}) => {
      if (res && res.data) {
        dispatch(setPostComments(res.data));
      } else {
        dispatch(setPostComments(null));
      }
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
        // updatePostCommentsEdit(state.commentsEdit, action.commentId)
      }

    case SET_COMMENTS_COUNT:
      return {
        ...state,
        commentsCount: action.commentsCount
      }

    case SET_NEW_COMMENT:
      return {
        ...state,
        comments: updatePostComments(state.comments, action.comment),
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
