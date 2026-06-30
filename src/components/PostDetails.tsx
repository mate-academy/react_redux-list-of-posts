import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  removeComment,
} from '../features/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { RootState } from '../app/store';
import type { CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector((state: RootState) => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector((state: RootState) => state.comments);

  const [areCommentsVisible, setAreCommentsVisible] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Завантажуємо коментарі щоразу, як змінюється вибраний пост
  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
      setAreCommentsVisible(true); // Автоматично відкриваємо блок
      setIsAddingComment(false); // Ховаємо форму при зміні поста
    }
  }, [selectedPost, dispatch]);

  if (!selectedPost) {
    return null;
  }

  const handleCommentSubmit = async (data: CommentData) => {
    await dispatch(addComment({ ...data, postId: selectedPost.id })).unwrap();
  };

  const handleCommentDelete = (commentId: number) => {
    // Видаляємо коментар одразу з UI, не чекаючи відповіді сервера
    dispatch(removeComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      {/* Заголовок з правильним форматуванням та атрибутом */}
      <h2 className="title" data-cy="PostTitle">
        #{selectedPost.id}: {selectedPost.title}
      </h2>

      {/* Тіло поста */}
      <p data-cy="PostBody">{selectedPost.body}</p>

      <button
        type="button"
        className="button is-link"
        onClick={() => setAreCommentsVisible(!areCommentsVisible)}
      >
        {areCommentsVisible ? 'Hide comments' : 'Show comments'}
      </button>

      {areCommentsVisible && (
        <div className="box mt-4">
          <h3 className="title is-5">Comments:</h3>

          {/* Показуємо лоадер, поки йде завантаження */}
          {!loaded && !hasError && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong with loading comments.
            </div>
          )}

          {/* Показуємо коментарі та кнопку додавання ТІЛЬКИ після завантаження */}
          {loaded && !hasError && (
            <>
              {comments.length === 0 ? (
                <p data-cy="NoCommentsMessage">No comments yet</p>
              ) : (
                <ul>
                  {comments.map(comment => (
                    <li key={comment.id} className="mb-3" data-cy="Comment">
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>

                        <button
                          type="button"
                          className="delete"
                          aria-label="delete"
                          onClick={() => handleCommentDelete(comment.id)}
                        />
                      </div>

                      <p data-cy="CommentBody">{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}

              <hr />

              {/* Логіка відображення форми чи кнопки */}
              {!isAddingComment ? (
                <button
                  type="button"
                  className="button is-link"
                  data-cy="WriteCommentButton"
                  onClick={() => setIsAddingComment(true)}
                >
                  Write a comment
                </button>
              ) : (
                <NewCommentForm onSubmit={handleCommentSubmit} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
