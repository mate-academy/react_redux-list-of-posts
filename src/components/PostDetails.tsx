import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  addNewComment,
  loadComments,
} from '../features/comments';
import { PostCommentData } from '../types/PostComment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { comments, loading, hasError } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setVisible(false);

    dispatch(loadComments(selectedPost.id));
  }, [selectedPost.id, dispatch, selectedPost]);

  const addComment = async ({ name, email, body }: PostCommentData) => {
    const newComment = {
      postId: selectedPost.id,
      name,
      email,
      body,
    };

    const created = await commentsApi.createComment(newComment);

    dispatch(addNewComment(created));
  };

  const deletePostComment = async (commentId: number) => {
    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading ? (
          <Loader />
        ) : (
          <>
            {hasError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                {!hasError && comments.length === 0 && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!hasError && comments.length > 0 && (
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
                            onClick={() => deletePostComment(comment.id)}
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
                {!loading && !visible && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setVisible(true)}
                  >
                    Write a comment
                  </button>
                )}

                {visible && <NewCommentForm onSubmit={addComment} />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
