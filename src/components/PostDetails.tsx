import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  initComments,
  setComments,
  addComment,
  removeComment,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { commentList, isCommLoading, hasCommError } = useAppSelector(
    st => st.comments,
  );
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(initComments(post.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  async function handleAdd({ name, email, body }: CommentData) {
    const newComment = {
      name,
      email,
      body,
      postId: post.id,
    };

    await dispatch(addComment(newComment));
  }

  function handleDelete(commId: number) {
    dispatch(removeComment(commId));
    dispatch(setComments(commentList.filter(c => c.id !== commId)));
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommLoading && <Loader />}

        {!isCommLoading && hasCommError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isCommLoading && !hasCommError && commentList.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isCommLoading && !hasCommError && commentList.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {commentList.map(comment => (
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
                    onClick={() => handleDelete(comment.id)}
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

        {!isCommLoading && !hasCommError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isCommLoading && !hasCommError && isFormVisible && (
          <NewCommentForm onSubmit={handleAdd} />
        )}
      </div>
    </div>
  );
};
