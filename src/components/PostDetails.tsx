import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import {} from 'react-redux';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  fetchCommentsByPost,
  removeComment,
} from '../features/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { post } = useAppSelector(state => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector((state: RootState) => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (post.id) {
      dispatch(fetchCommentsByPost(post.id));
    }
  }, [post.id, dispatch]);

  const handleAddComment = async (data: {
    name: string;
    email: string;
    body: string;
  }) => {
    await dispatch(addComment({ ...data, postId: post.id }));
    setVisible(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(removeComment(commentId));
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
                    onClick={() => handleDeleteComment(comment.id)}
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
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
