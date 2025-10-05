import React, { useEffect } from 'react';
import { Loader } from './Loader';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addPostComment, deletePostComment, fetchPostComments, setModalVisible } from '../features/comments/commentsSlice';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const { items: comments, loaded, hasError, visible } = useAppSelector(s => s.comments);
  const { selectedPost } = useAppSelector(s => s.selectedPost);

  useEffect(() => {
    dispatch(fetchPostComments(post.id));
  }, [dispatch, post.id])


  const handleAddComment = async (commentBody: CommentData) => {
    if (selectedPost?.id) {
      await dispatch(addPostComment({ ...commentBody, postId: selectedPost.id }));
    }
  }

  const handleDeleteComment = async (Id: number) => {
    dispatch(deletePostComment(Id));
  }


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
            onClick={() => dispatch(setModalVisible())}
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
