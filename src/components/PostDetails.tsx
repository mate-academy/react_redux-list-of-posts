import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { createComment, deleteComment } from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  commentsActions,
  getPostCommentsFromServer,
} from '../features/slices/CommentsSlice';
// import { getPostCommentsFromServer } from '../features/slices/CommentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post) {
      dispatch(getPostCommentsFromServer(post.id));
    }

    setVisible(false);
  }, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentsActions.addComment(newComment));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      return 'Something went wrong';
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));

    await deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
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
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
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
