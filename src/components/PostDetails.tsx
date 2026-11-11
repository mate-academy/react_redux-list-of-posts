import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { loadPostComments } from '../features/comments/thunks/loadCommentsThunk';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { Loader } from './Loader';
import { deletePostComment } from '../features/comments/thunks/deleteComment';
import { NewCommentForm } from './NewCommentForm';
import { resetCommentCreateStatus } from '../features/comments/comments';

export const PostDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const post = useAppSelector(state => state.selectedPost.value);
  const postComments = useAppSelector(state => state.comments);
  const commentDeleteStatus = useAppSelector(
    state => state.comments.deleteStatus,
  );

  const commentCreateStatus = useAppSelector(
    state => state.comments.createStatus,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (post) {
      dispatch(loadPostComments(post.id));
    }
  }, [dispatch, post, post?.id]);

  useEffect(() => {
    if (commentCreateStatus !== 'failed') {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(resetCommentCreateStatus());
    }, 2000);

    return () => clearTimeout(timer);
  }, [commentCreateStatus, post, dispatch]);

  useEffect(() => {
    setShowForm(false);
  }, [post]);

  if (!post) {
    return;
  }

  const { id, title, body } = post;
  const {
    items: comments,
    loading: loadingComments,
    loaded: commentsLoaded,
    hasError,
  } = postComments;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {loadingComments && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong while loading comments!
          </div>
        )}

        {commentsLoaded && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsLoaded && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    disabled={commentDeleteStatus === 'deleting'}
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => dispatch(deletePostComment(comment.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {commentsLoaded && !showForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}

        {showForm && (
          <>
            {commentCreateStatus === 'failed' && (
              <div className="notification is-danger">
                Something went wrong while creating comment!
              </div>
            )}

            <NewCommentForm />
          </>
        )}
      </div>
    </div>
  );
};
