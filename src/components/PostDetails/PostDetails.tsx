import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

import { actions, selectors } from '../../store/main';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const selectedPostId = useSelector(selectors.getPostIdSelector);
  const post = useSelector(selectors.getSelectedPost);
  const comments = useSelector(selectors.getCommentsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    async function result() {
      const postFromServer = await getPostDetails(selectedPostId);
      const commentsFromServer = await getPostComments(selectedPostId);

      dispatch(actions.loadOnePost(postFromServer));
      dispatch(actions.loadComments(commentsFromServer));
    }

    result();
  }, [selectedPostId]);

  const handleRemoveComment = async (id: number) => {
    await removeComment(id);

    dispatch(actions.removeComment(id));
  };

  return (
    <div className="PostDetails" data-cy="postDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisible(state => !state)}
          >
            {commentsVisible
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}

        {commentsVisible && (
          <ul className="PostDetails__list">
            {comments.map((comment) => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleRemoveComment(comment.id)}
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
