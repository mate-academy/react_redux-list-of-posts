import React, {
  useEffect,
  useState,
} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  fetchComments,
  removeComment,
  actions as commentsActions,
} from '../features/comments';

export const PostDetails: React.FC = () => {
  const { selectedPost: post } = useAppSelector(state => state.posts);
  const {
    comments,
    isLoaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchComments(post?.id as number));
  },
  [post?.id, dispatch]);

  const deleteComment = (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));
    dispatch(removeComment(commentId));
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
        {!isLoaded && (
          <Loader />
        )}

        {isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !hasError && comments.length > 0 && (
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

        {isLoaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
