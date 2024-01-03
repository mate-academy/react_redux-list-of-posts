import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComments,
  deleteComment as deleteCommentReduce,
} from '../features/commentsSlice/commentsSlice';
import { RootState } from '../app/store';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const comments = useAppSelector((state: RootState) => state.comments.items);
  const { loaded, hasError } = useAppSelector(
    (state: RootState) => state.comments,
  );

  function loadComments() {
    dispatch(fetchComments(post.id));
  }

  useEffect(loadComments, [dispatch, post?.id]);

  function addComment(data: CommentData) {
    const newComment = { ...data, postId: post.id };

    dispatch(addComments(newComment));
  }

  function deleteComment(id: number) {
    dispatch(deleteCommentReduce(id));
  }

  const noCommentsMessage = (
    <p className="title is-4" data-cy="NoCommentsMessage">
      No comments yet
    </p>
  );

  const hasComments = loaded && !hasError && comments.length > 0;

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
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {hasComments ? (
          (
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
          )
        ) : noCommentsMessage}

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
          <NewCommentForm onSubmit={(data: CommentData) => addComment(data)} />
        )}
      </div>
    </div>
  );
};
