import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getPostComments, getPostDetails } from '../../api/api';
import { setComments, setCurrentPost } from '../../store';
import {
  getCurrentPostSelector,
  getCurrentPostIdSelector,
  getCommentsSelector,
} from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const dispatch = useDispatch();

  const currentPostId = useSelector(getCurrentPostIdSelector);
  const currentPost = useSelector(getCurrentPostSelector);
  const comments = useSelector(getCommentsSelector);

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const postDetailsFromServer = await getPostDetails(+currentPostId);

        const commentsToPost = await getPostComments(+currentPostId);

        dispatch(setComments(commentsToPost));
        dispatch(setCurrentPost(postDetailsFromServer));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    loadPostDetails();
  }, [currentPostId]);

  const handleDeleteButton = async (commentId: number) => {
    await deleteComment(commentId);

    const newComments = await getPostComments(+currentPostId);

    dispatch(setComments(newComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{currentPost?.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsCommentsVisible(status => !status);
          }}
        >
          {isCommentsVisible
            ? ('Hide comments')
            : ('Show comments')}
        </button>
        {isCommentsVisible && (
          <ul className="PostDetails__list" data-cy="postDetails">
            {comments?.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    handleDeleteButton(comment.id);
                  }}
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
    </div>
  );
};
