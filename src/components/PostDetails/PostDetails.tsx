import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { selectors, deleteComment } from '../../redux/index';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const [isCommentsVisible, setCommentsVisible] = useState(true);
  const comments = useSelector(selectors.getPostComments);
  const selectedPostId = useSelector(selectors.getSelectedPostId);
  const post = useSelector(selectors.getPostDetails);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments && (comments.length === 0 ? 'No Comments'
          : (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisible(!isCommentsVisible)}
            >
              {isCommentsVisible ? 'Hide' : 'Show'}
              {' '}
              {comments.length}
              {' '}
              {(comments.length === 1) ? 'comment' : 'comments'}
            </button>
          ))}
        <ul className="PostDetails__list">
          {comments && isCommentsVisible && comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => dispatch(deleteComment(comment.id))}
              >
                X
              </button>

              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          {selectedPostId
            && (
              <NewCommentForm />
            )}
        </div>
      </section>
    </div>
  );
};
