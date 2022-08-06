/* eslint-disable no-console */
/* eslint-disable padded-blocks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments } from '../../api/posts';
import { Loader } from '../Loader';
import './PostDetails.scss';
import { RootState } from '../../store/index';
import { GET_COMMENTS, REMOVE_COMMENT } from '../../store/commentsReducer';

type Props = {
  postId: number;
};

type Comment = {
  id: number;
  title: string;
  body: string;
};

export const PostDetails: React.FC <Props> = ({ postId }) => {
  const [details, setDetails] = useState({
    title: '',
  });
  const [commentsVisible, setCommentsVisible] = useState(true);
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments.comments);

  useEffect(() => {
    getPostComments(postId)
      .then(postFromServer => {
        dispatch({ type: GET_COMMENTS, payload: postFromServer });
      });

    getPostDetails(postId)
      .then(postFromServer => {
        setDetails(postFromServer);
      });
  }, [postId]);

  if (comments.length === 0 && details.title === '') {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length !== 0 && (
          <>
            {(commentsVisible) ? (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setCommentsVisible(false);
                }}
              >
                {`Hide ${comments.length} comments`}
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setCommentsVisible(true);
                }}
              >
                {`Open ${comments.length} comments`}
              </button>
            )}
          </>
        )}

        {(comments.length !== 0 && commentsVisible) && (
          <ul className="PostDetails__list">
            {comments.map(((comment: Comment) => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    dispatch({ type: REMOVE_COMMENT, payload: comment.id });
                  }}
                >
                  X
                </button>
                {comment.body}
              </li>
            )))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
