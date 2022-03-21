import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadCommentsAction } from '../../store/actions';
import {
  getCommentsSelector,
  getPostIdSelector,
  getPostsSelector,
} from '../../store/selectors';

import { deleteComment, getComments } from '../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const comments = useSelector(getCommentsSelector);
  const postId = useSelector(getPostIdSelector);
  const posts = useSelector(getPostsSelector);

  const dispatch = useDispatch();

  const loadCommentsFromServer = async () => {
    const commentsFromServer = await getComments(postId);

    dispatch(loadCommentsAction(commentsFromServer));
  };

  useEffect(() => {
    loadCommentsFromServer();
  }, [postId]);

  const handleRemoveComment = async (id: number) => {
    await deleteComment(id);

    dispatch(loadCommentsAction(await getComments(postId)));
  };

  const changeCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="PostDetails">
      <h2>
        Post details:
      </h2>

      {postId > 0 && (
        <>
          <section className="PostDetails__post">
            <p>{posts.find(post => post.id === postId)?.body}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length === 0
              ? (
                <button
                  type="button"
                  className="button"
                >
                  No comments
                </button>
              )
              : (
                <button
                  type="button"
                  className="button"
                  onClick={changeCommentsVisibility}
                >
                  {isCommentsVisible ? 'Close Comments' : 'Open comments'}
                </button>
              )}

            {isCommentsVisible && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
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
              <NewCommentForm
                postId={postId}
                loadComments={loadCommentsFromServer}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
