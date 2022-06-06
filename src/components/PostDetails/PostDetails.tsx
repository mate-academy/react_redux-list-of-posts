import { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks/redux';
import { commentSlice } from '../../store/reducers/CommentSlice';
import { removeComment } from '../../store/reducers/ActionCreators';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: FC = memo(() => {
  const post = useAppSelector(state => state.postsReducer.currentPost);
  const {
    comments,
    isCommentsVisible,
  } = useAppSelector(state => state.commentReducer);
  const { hideComments } = commentSlice.actions;

  const dispatch = useDispatch();

  const showComments = useCallback(() => {
    dispatch(hideComments(!isCommentsVisible));
  }, [isCommentsVisible]);

  const handleDelete = useCallback((id: number) => {
    const filteredComments = comments.filter(comment => comment.id !== id);

    dispatch(removeComment(id, filteredComments));
  }, [comments]);

  return (
    <>
      {post && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {comments.length ? (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={showComments}
              >
                {isCommentsVisible ? 'Hide' : 'Show'}
                {` ${comments.length} comments`}
              </button>

              {isCommentsVisible && (
                <ul className="PostDetails__list">
                  {comments.map(postComment => (
                    <li
                      key={postComment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleDelete(postComment.id)}
                      >
                        X
                      </button>
                      <p>{postComment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : (
            <p>No comments yet</p>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </div>
      )}
    </>
  );
});
