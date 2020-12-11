import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Comment } from '../helpers/interfaces';
import { removeComment } from '../store';
import { getvisibleComments, getNewPost, getNewComment, isDisabled } from '../store/selectors';
import { changeVisibleOfComments } from '../store/visibleComments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import './PostDetails.scss';

type PostDetailsProps = {
  postId: number
};

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const dispatch = useDispatch();

  const visibleComments = useSelector(getvisibleComments);
  const post = useSelector(getNewPost);
  const comments = useSelector(getNewComment);
  const isButtonDisabled = useSelector(isDisabled);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post !== null && post.title}</p>
      </section>
      {comments.length === undefined
        ? <Loader />
        : (
          comments.length > 0 &&
          <section className="PostDetails__comments">
            <button
              type="button"
              className="PostDetails__button"
              onClick={() => dispatch(changeVisibleOfComments(!visibleComments))}
            >
              {visibleComments ? `Hide` : 'Show'}
              {` ${comments.length} comments`}
            </button>

            {visibleComments && (
              <ul className="PostDetails__list">
                {comments.length > 0 && comments.map((comment: Comment) => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__button"
                      onClick={() => dispatch(removeComment(comment.id, postId))}
                      disabled={isButtonDisabled}
                    >
                      X
                </button>
                    <p>{comment.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

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
