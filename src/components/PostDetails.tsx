import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments } from '../features/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { RootState } from '../app/store';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  // Дістаємо вибраний пост та стан коментарів зі Store
  const selectedPost = useAppSelector((state: RootState) => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector((state: RootState) => state.comments);

  // Локальний стан для кнопки Show/Hide
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);

  // Завантажуємо коментарі щоразу, як змінюється вибраний пост
  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
      setAreCommentsVisible(false); // Ховаємо коментарі при зміні поста
    }
  }, [selectedPost, dispatch]);

  if (!selectedPost) {
    return null;
  }

  return (
    <div className="content">
      <h2 className="title">{selectedPost.title}</h2>
      <p>{selectedPost.body}</p>

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

          {!loaded && <Loader />}

          {hasError && (
            <div className="notification is-danger">
              Something went wrong with loading comments.
            </div>
          )}

          {loaded && !hasError && (
            <ul>
              {comments.map(comment => (
                <li key={comment.id} className="mb-3">
                  <strong>{comment.name}</strong>: {comment.body}
                </li>
              ))}
            </ul>
          )}

          <hr />
          <NewCommentForm />
        </div>
      )}
    </div>
  );
};
