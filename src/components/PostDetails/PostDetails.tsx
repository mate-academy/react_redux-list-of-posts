import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { deleteComment, getPostComments } from '../../helpers/comments';
import { getPostDetails } from '../../helpers/posts';
import { Post } from '../../react-app-env';
import './PostDetails.scss';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { setPostComments } from '../../store';
// eslint-disable-next-line import/order
import { useDispatch, useSelector } from 'react-redux';
import { getPostCommentsSelector } from '../../store/selectors';

type Props = {
  postId: number
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(getPostCommentsSelector);

  const [visibleComments, setVisibleComments] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const postHandler = async () => {
    try {
      const postDetails = await getPostDetails(postId);

      setPost(postDetails);
      setHasLoadingError(false);
    } catch (error) {
      setHasLoadingError(true);
      setPost(null);
    }
  };

  useEffect(() => {
    const loadCommentsFromServer = async () => {
      const commentsFromServer = await getPostComments(postId);

      dispatch(setPostComments(commentsFromServer));
    };

    loadCommentsFromServer();
    postHandler();
  }, [postId]);

  const deleteHandler = async (commentId: number) => {
    if (postId) {
      await deleteComment(commentId);
      const newComments = await getPostComments(postId);

      dispatch(setPostComments(newComments));
    }
  };

  const commentsHandler = async () => {
    const newComments = await getPostComments(postId);

    dispatch(setPostComments(newComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {hasLoadingError ? (
        <p className="error">An error occurred while loading the data</p>
      ) : (
        <>
          <section className="PostDetails__post">
            <p>{post?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className={classnames('button', {
                noshow: comments.length < 1,
              })}
              onClick={() => {
                setVisibleComments(!visibleComments);
              }}
            >
              {visibleComments ? 'Hide comments' : 'Show comments'}
            </button>
            {visibleComments && (
              <ul className="PostDetails__list">
                {comments?.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteHandler(comment.id)}
                    >
                      X
                    </button>
                    <p>
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              {post && (
                <NewCommentForm
                  postId={postId}
                  onCommentsHandler={commentsHandler}
                />
              )}
            </div>
          </section>
        </>
      )}

    </div>
  );
};
