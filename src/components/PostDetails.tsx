import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
// Імпортуємо наші Redux інструменти
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../app/slices/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  // Отримуємо дані для конкретного поста
  const comments = useAppSelector(state => state.comments.items[post.id] || []);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);

  // Локальний стан залишаємо тільки для UI-логіки (показ форми)
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Завантажуємо коментарі лише якщо їх ще немає в кеші для цього поста
    // Або просто викликаємо щоразу, якщо хочемо актуальні дані
    dispatch(fetchComments(post.id));
    setIsFormVisible(false);
  }, [post.id, dispatch]);

  const handleAddComment = (data: CommentData) => {
    // Повертаємо проміс, щоб NewCommentForm міг обробити loading/errors самостійно
    return dispatch(addComment({ postId: post.id, comment: data })).unwrap();
    // .then(() => setIsFormVisible(false)) <-- ВИДАЛИ ЦЕЙ РЯДОК
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment({ commentId, postId: post.id }));
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
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isFormVisible && <NewCommentForm onSubmit={handleAddComment} />}
      </div>
    </div>
  );
};
