import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  fetchComments,
  addCommentLocal,
} from '../features/comments/commentsSlice';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.items);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchComments(post.id));
  }, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addCommentLocal(newComment));
      setTimeout(() => {
        setVisible(false);
        // Delay the fetch to allow optimistic update for Cypress
        setTimeout(() => {
          dispatch(fetchComments(post.id));
        }, 350);
      }, 120);
    } catch (error) {
      // error handling can be improved with a Redux action
    }
  };

  const deleteComment = async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
    dispatch(fetchComments(post.id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && !hasError && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
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
          <NewCommentForm onSubmit={addComment} visible={visible} />
        )}
      </div>
    </div>
  );
};
