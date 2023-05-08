import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as commentsActions from './commentsSlice';
import { Loader } from '../../components/Loader';
import { Post } from '../../types/Post';
import { CommentData } from '../../types/Comment';
import { NewCommentForm } from '../../components/NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { items, loaded, hasError } = useAppSelector((state) => state.comments);
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);

    dispatch(commentsActions.getAllPostComments(post.id));
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(commentsActions.addComment(
      {
        name,
        email,
        body,
        postId: post.id,
      },
    ));
  };

  const deleteComment = (commentToDeleteId: number) => {
    dispatch(commentsActions.remove(commentToDeleteId));
    dispatch(commentsActions.deletePostComment(commentToDeleteId));
  };

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

        {loaded && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(item => (
              <article
                className="message is-small"
                key={item.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${item.email}`} data-cy="CommentAuthor">
                    {item.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(item.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {item.body}
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
