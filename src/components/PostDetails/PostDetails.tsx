/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments, deleteComment } from '../../api/comment';
import './PostDetails.scss';
import {
  getSelectedPostCommentsSelector,
  getSelectedPostIdSelector,
} from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../react-app-env';
import { setSelectedPostComments } from '../../store';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();

  const selectedPostId = useSelector(getSelectedPostIdSelector);
  const comments = useSelector(getSelectedPostCommentsSelector);

  const [post, setPost] = useState<Post | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const commentsGetter = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      dispatch(setSelectedPostComments(commentsFromServer));
    } catch (error) {
      console.log(error);
    }
  };

  const postDetailsGetter = async () => {
    try {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    commentsGetter();
    postDetailsGetter();
  }, [selectedPostId]);

  const deleteHandler = async (id: number) => {
    try {
      await deleteComment(id);
      const refreshedComments = await getPostComments(selectedPostId);

      dispatch(setSelectedPostComments(refreshedComments));
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedPostId) {
    return <span>no details</span>;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? 'Hide comments' : 'Show comments'}
        </button>
        {isVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  onClick={() => {
                    deleteHandler(comment.id);
                  }}
                  className="PostDetails__remove-button button"
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
          <NewCommentForm
            commentsGetter={commentsGetter}
          />
        </div>
      </section>
    </div>
  );
};
