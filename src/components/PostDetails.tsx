import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments';
import { Comment, CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { post } = useAppSelector(state => state.selectedPost);
  const { loaded, hasError } = useAppSelector(state => state.comments);

  const [comments, setComments] = useState<Comment[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    if (post) {
      dispatch(commentsActions.getComments(post.id)).then(res => {
        setComments(res.payload as Comment[]);
      });
    }
  }, [post, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (post) {
      const newComment: Omit<Comment, 'id'> = {
        name,
        email,
        body,
        postId: post.id,
      };

      await dispatch(commentsActions.createNewComment(newComment)).then(res =>
        setComments(currentComments => [
          ...currentComments,
          res.payload as Comment,
        ]),
      );
    }
  };

  const deleteComment = async (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    await dispatch(commentsActions.deleteAPIComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      {loaded && hasError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      {!!post && (
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>
      )}

      <div className="block">
        {!loaded && <Loader />}

        {loaded && !hasError && comments?.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments?.length > 0 && (
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

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
