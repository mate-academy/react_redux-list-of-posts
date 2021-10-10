import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, setComments } from '../../store/showComments';
import { CommentForm } from '../CommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { postDetails } = useSelector(({ showPostDetails }: any) => showPostDetails);

  const { id: postId, body: postBody } = postDetails;

  const { comments } = useSelector(({ showComments }: any) => showComments);

  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(setComments(postId));
  }, [postId]);

  const handleSetShow = () => {
    setShow(prev => !prev);
  };

  const handleDeletePostComments = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postBody}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleSetShow}
        >
          {show ? 'Hide' : 'Show'}
          {` ${comments.length} comments`}
        </button>

        {show && (
          <ul className="PostDetails__list">
            {comments.map(({ id, body }: any) => (
              <li
                key={id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeletePostComments(id)}
                >
                  X
                </button>
                <p>
                  {body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <CommentForm
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
