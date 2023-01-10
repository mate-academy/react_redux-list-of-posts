import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectComments,
  selectCommentsError,
  selectCommentsLoaded,
} from '../store/comments/postsSelectors';
import { commentsAsync } from '../store/comments/commentsAsync';
import { selectCurrentPost } from '../store/posts/postsSelectors';
import { appActions } from '../store/app/appSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);
  const loaded = useAppSelector(selectCommentsLoaded);
  const hasError = useAppSelector(selectCommentsError);
  const currenPost = useAppSelector(selectCurrentPost);

  const [visible, setVisible] = useState(false);

  const deleteComment = (id: number) => {
    dispatch(commentsAsync.deleteComment(id))
      .unwrap()
      .then(() => {
        dispatch(appActions.enqueueSnackbar(
          { key: Date.now().toString(), message: 'Comment was deleted' },
        ));
      });
  };

  const handleFetchComments = () => {
    if (currenPost) {
      dispatch(commentsAsync.fetchComments(currenPost.id));
    }
  };

  useEffect(() => {
    handleFetchComments();
    setVisible(false);
  }, [currenPost]);

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

        {loaded && !hasError && comments?.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments?.map(comment => (
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
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
