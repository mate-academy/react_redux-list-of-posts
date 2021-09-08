import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../images/delete.svg';
import editIcon from '../../images/edit.svg';

import { getComment } from '../../api/comments';

import {
  getPostComments,
  getPostCommentsEdit,
  arePostCommentsUpdated
} from '../../store';
import {
  fetchPostComments,
  setCommentEdit,
  setCommentsUpdated,
  removeComment
} from '../../store/commentsReducer'

import { Comment, CommentsEdit } from '../../types';

type Props = {
  postId: number,
};

export const Comments: React.FC<Props> = React.memo(({ postId }) => {
  const comments: Comment[] | null = useSelector(getPostComments);
  const areCommentsUpdated: boolean = useSelector(arePostCommentsUpdated);
  const commentsEdit: CommentsEdit = useSelector(getPostCommentsEdit);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPostComments(postId));
    }

    if (commentsEdit) {
      dispatch(setCommentEdit(null));
    }

    if (areCommentsUpdated) {
      dispatch(setCommentsUpdated(false));
    }
  }, [postId, areCommentsUpdated, dispatch]);

  const removeCommentHandler = async (commentId: number) => {
    await removeComment(commentId);
    dispatch(setCommentsUpdated(true));
  };

  const editCommentHandler = (commentId: number) => {
    getComment(commentId)
      .then(res => {
        dispatch(setCommentEdit(res));
      });
  };

  if (comments) {
    return (
      <ul className="PostDetails__list">
        {comments.map(comment => (
          <li className="PostDetails__list-item" key={comment.id}>
            <span>{comment.body} <sub>{comment.id} post {postId}</sub></span>
            <div>
              {commentsEdit.includes(comment.id) && (
                <button
                  type="button"
                  className="button button--icon"
                  onClick={(ev) => {
                    ev.preventDefault();
                    editCommentHandler(comment.id);
                  }}
                >
                  <img src={editIcon} alt="edit icon"></img>
                </button>
              )}
              <button
                type="button"
                className="button button--icon"
                onClick={(ev) => {
                  ev.preventDefault();

                  if (comment.id) {
                    removeCommentHandler(comment.id);
                  }
                }}
              >
                <img src={deleteIcon} alt="delete icon"></img>
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  } else {
    return (
      <p className="info">No comments</p>
    );
  }
});
