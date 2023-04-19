/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments/comments';

type Props = {
  post: Post
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { comment, commentError, commentLoad }
    = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(commentsActions.comments(post.id));
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      await dispatch(commentsActions.addNew(newComment));
    } catch (error) {
      console.error(error);
    }
  };

  const hadyleDelete = async (commentId: number) => {
    commentsApi.deleteComment(commentId);

    dispatch(commentsActions.deleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {commentLoad && (
          <Loader />
        )}

        {commentError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comment.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comment.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comment.map(coment => (
              <article
                className="message is-small"
                key={coment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${coment.email}`} data-cy="CommentAuthor">
                    {coment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => hadyleDelete(coment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {coment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
