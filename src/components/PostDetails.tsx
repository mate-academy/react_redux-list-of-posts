import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsAction from '../features/comments';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { comments, isLoading, isError } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    setVisible(false);
    dispatch(commentsAction.commentsInit(post.id));
  }, [dispatch, post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    dispatch(
      commentsAction.addNewCommentFromServer({
        name,
        email,
        body,
        postId: post.id,
      }),
    );
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsAction.deleteCommentFromServer(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}
            {!isError && comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
            {!isError && comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    key={comment.id}
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
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
            {!isError && !visible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setVisible(true)}
              >
                Write a comment
              </button>
            )}
            {!isError && visible && <NewCommentForm onSubmit={addComment} />}
          </>
        )}
      </div>
    </div>
  );
};
