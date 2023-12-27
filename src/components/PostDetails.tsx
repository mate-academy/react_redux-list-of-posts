import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments, removeComment, removeCommentFromApi, setComments,
} from '../features/commentsSlice';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.comments.isLoading);
  const hasError = useAppSelector(state => state.comments.hasError);
  const comments = useAppSelector(state => state.comments.items);
  const post = useAppSelector(state => state.selectedPost.selectedPost);

  function loadComments(postId: number) {
    setVisible(false);
    dispatch(fetchComments(postId));
  }

  useEffect(() => {
    if (post) {
      loadComments(post.id);
    } else {
      dispatch(setComments(null));
    }
  }, [post?.id]);

  const deleteComment = async (commentId: number) => {
    if (comments) {
      dispatch(removeComment(commentId));
      dispatch(removeCommentFromApi(commentId));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments?.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && Boolean(comments?.length) && (
          <>
            <p className="title is-4">Comments:</p>

            {comments?.map(comment => (
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
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
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

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
