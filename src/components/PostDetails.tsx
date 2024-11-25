import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './Loader';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import {
  fetchComments,
  removeComment,
  addComment,
} from '../features/comments/commentsSlice';
import { useSelector } from 'react-redux';

type Props = {
  post: Post;
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    loaded,
    hasError,
    items: comments,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);
  const previousPostId = useRef(post.id);

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch, post.id]);

  useEffect(() => {
    setVisible(false);
  }, [post.id]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    try {
      await dispatch(
        addComment({ name, email, body, postId: post.id }),
      ).unwrap();
    } catch (er) {
    } finally {
      if (post.id !== previousPostId.current) {
        setVisible(false);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await dispatch(removeComment(commentId)).unwrap();
    } catch (eror: any) {}
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
