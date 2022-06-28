import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { setPostComments, setSelectedPost } from '../../store';
// eslint-disable-next-line max-len
import { getPostCommentsSelector, getSelectedPost, getSelectedPostIdSelector } from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();

  const selectedPostId = useSelector(getSelectedPostIdSelector);
  const post = useSelector(getSelectedPost);

  const comments = useSelector(getPostCommentsSelector);

  const [showComments, setShowComments] = useState(true);

  const requestPost = async () => {
    try {
      const postFromServer = await getPostDetails(selectedPostId);

      dispatch(setSelectedPost(postFromServer));
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  const requestComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      dispatch(setPostComments(commentsFromServer));
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  useEffect(() => {
    requestPost();
    requestComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length === 0 && 'No comments'}
        <div className={cn({ hidden: comments.length === 0 })}>
          {!showComments
            ? (
              <button
                className="button"
                type="button"
                onClick={() => {
                  setShowComments(true);
                }}
              >
                {`Show ${comments.length} comments`}
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setShowComments(false);
                }}
              >
                {`Hide ${comments.length} comments`}
              </button>
            )}
        </div>

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async () => {
                    await deleteComment(comment.id);
                    await requestComments();
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
          {post && (
            <NewCommentForm
              post={post}
              onRequest={requestComments}
            />

          )}
        </div>
      </section>
    </div>
  );
};
