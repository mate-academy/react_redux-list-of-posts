import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Comment } from '../helpers/interfaces';
import { removeComment } from '../store';
import { getvisibleComments, getNewPost, getNewComment } from '../store/selectors';
import { changeVisibleOfComments } from '../store/visibleComments';
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

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post !== null && post.title}</p>
      </section>
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
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
                  className="PostDetails__remove-button button"
                  onClick={() => dispatch(removeComment(comment.id, postId))}
                >
                  X
                </button>
                <p>{comment.name}</p>
              </li>
            ))}
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
