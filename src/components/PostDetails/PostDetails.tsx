import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import {
  getPost,
  getPostId,
  getComments,
  isHiding,
  removeComment,
} from '../../store';
import { hideComments } from '../../store/hideComments';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const post = useSelector(getPost);
  const postId = useSelector(getPostId);
  const comments: Comments[] = useSelector(getComments);
  const hide = useSelector(isHiding);

  const handleClickOnHideButton = () => {
    dispatch(hideComments());
  };

  const handleClickOnDeleteButton = (id: number) => {
    dispatch(removeComment(id, postId));
  };

  return (
    <div className="PostDetails">
      {post && (
        <>
          <section className="PostDetails__post">
            <p>
              {post.body}
            </p>
          </section>

          <section className="PostDetails__comments">
            {comments.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={handleClickOnHideButton}
              >
                {hide ? 'Show ' : 'Hide '}
                {comments.length}
                {comments.length > 1 ? ' comments' : ' comment'}
              </button>
            )}

            {!hide && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleClickOnDeleteButton(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
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
        </>
      )}
    </div>
  );
};
