import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { useAppSelector } from '../app/hooks';
import {
  create,
  deletePostCommnets,
  fetchPostCommnets,
  selectCommentState,
} from '../features/commentsSlice';
import { selectPost } from '../features/selectedPostSlice';
import { CommentData } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import React from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const selectedPost = useAppSelector(selectPost);

  const {
    comments,
    error: hasError,
    loading: loaded,
  } = useAppSelector(selectCommentState);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    setVisible(false);
    if (selectedPost?.id) {
      dispatch(fetchPostCommnets(selectedPost.id || 0));
    }
  }, [selectedPost?.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = {
        name,
        email,
        body,
        postId: post.id,
      };

      dispatch(create(newComment));
    } catch (e) {}
  };

  const deleteComment = async (commentId: number) => {
    dispatch(deletePostCommnets(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
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

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
