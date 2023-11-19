import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment, deleteComment,
  fetchComments,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const post
    = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    setVisible(false);

    if (post?.id !== undefined) {
      dispatch(fetchComments(post.id));
    }
  }

  useEffect(loadComments, [post?.id]);

  const addCommen = async ({ name, email, body }: CommentData) => {
    if (post?.id !== undefined) {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addComment(newComment));
    }
  };

  const deleteCommen = async (commentId: number) => {
    dispatch(deleteComment(commentId));
    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
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

            {items.map((item: Comment) => (
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
                    onClick={() => deleteCommen(item.id)}
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
            Write a item
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addCommen} />
        )}
      </div>
    </div>
  );
};
