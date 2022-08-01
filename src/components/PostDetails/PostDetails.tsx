/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getPostComments } from '../../api/comments';
import { setPostComments } from '../../store';
import { getComments, getPost, getSelectedPostId } from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [showComments, setShowComments] = useState(true);
  const selectedPostId = useSelector(getSelectedPostId);
  const comments = useSelector(getComments);
  const post = useSelector(getPost(selectedPostId));

  const dispatch = useDispatch();

  const loadComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      dispatch(setPostComments(commentsFromServer));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

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
            setShowComments(!showComments);
          }}
        >
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>

        {showComments && (
          <ul className="PostDetails__list" data-cy="postDetails">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async () => {
                    await deleteComment(comment.id);
                    await loadComments();
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
          <NewCommentForm loadComments={loadComments} />
        </div>
      </section>
    </div>
  );
};
