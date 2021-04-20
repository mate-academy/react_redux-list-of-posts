import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './PostDetails.scss';

import { getCommentsList, getPostsDetails, reLoadpostDetails, getCommentId, getPostId } from '../../store';
import { setCommentID } from '../../store/commentPostReducer';
import { COMMENT } from '../../type';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = () => {
  const dispatch = useDispatch();
  const comments: COMMENT[] = useSelector(getCommentsList);
  const postDetails = useSelector(getPostsDetails);
  const commentId = useSelector(getCommentId);
  const postId = useSelector(getPostId);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const fetchPostDetails = (commentId: number, postId: number) => {
      return dispatch(reLoadpostDetails(commentId, postId))
  }

  useEffect(() => {
    if (commentId !== 0) {
        fetchPostDetails(commentId, postId)
      };
  }, [commentId]);

  return (
    <div className="PostDetails">
      <h2>Post details: [User#{postDetails.userId}]</h2>

      <section className="PostDetails__post">
        <h3>Title: {postDetails.title}</h3>
        <p
          className="PostDetails__list-item"
        >
          Details: {postDetails.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setIsCommentsVisible(current => !current);
            }}
            >
            {isCommentsVisible
              ? `Show ${comments.length} comments`
              : `Hide ${comments.length} comments`
            }
            </button>
        )}
        {!isCommentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <p>{comment.body}</p>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    dispatch(setCommentID(comment.id));
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
