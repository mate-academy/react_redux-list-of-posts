import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  initComments,
  removeComment,
  // setComments,
} from '../features/CommentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { comments, loaded, hasError } = useAppSelector(st => st.comments);
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(initComments(post.id));
  }, [dispatch, post.id]);

  async function handleAdd({ name, email, body }: CommentData) {
    const newComment = {
      name,
      email,
      body,
      postId: post.id,
    };

    await dispatch(addComment(newComment));
  }

  function handleDelete(commentId: number) {
    dispatch(removeComment(commentId));
    // dispatch(setComments(comments.filter(comm => comm.id !== commentId)));
  }
  // function loadComments() {
  //   setLoaded(false);
  //   setError(false);
  //   setVisible(false);

  //   commentsApi
  //     .getPostComments(post.id)
  //     .then(setComments) // save the loaded comments // зберегти завантажені коментарі
  //     .catch(() => setError(true)) // show an error when something went wrong // показати помилку, коли щось пішло не так
  //     .finally(() => setLoaded(true)); // hide the spinner // приховати спінер
  // }

  // useEffect(loadComments, [post.id]);

  // The same useEffect with async/await
  // Той самий useEffect з async/await
  /*
  async function loadComments() {
    setLoaded(false);
    setVisible(false);
    setError(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      setComments(commentsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(loadComments, [post.id]); // Wrong!
  // effect can return only a function but not a Promise
  // ефект може повертати лише функцію, але не Promise
  */

  // const addComment = async ({ name, email, body }: CommentData) => {
  //   try {
  //     const newComment = await commentsApi.createComment({
  //       name,
  //       email,
  //       body,
  //       postId: post.id,
  //     });

  //     setComments(currentComments => [...currentComments, newComment]);

  //     // setComments([...comments, newComment]);
  //     // works wrong if we wrap `addComment` with `useCallback`
  //     // because it takes the `comments` cached during the first render
  //     // not the actual ones
  //     // setComments([...comments, newComment]);
  //     // працює неправильно, якщо ми обгортаємо `addComment` за допомогою `useCallback`
  //     // тому що він приймає `comments`, кешовані під час першого рендерингу
  //     // не самі коментарі
  //   } catch (error) {
  //     // we show an error message in case of any error
  //     // ми показуємо повідомлення про помилку у разі будь-якої помилки
  //     setError(true);
  //   }
  // };

  // const deleteComment = async (commentId: number) => {
  //   // we delete the comment immediately so as
  //   // not to make the user wait long for the actual deletion
  //   // ми видаляємо коментар негайно, щоб
  //   // не змушувати користувача довго чекати на фактичне видалення
  //   // eslint-disable-next-line max-len
  //   setComments(currentComments =>
  //     currentComments.filter(comment => comment.id !== commentId),
  //   );

  //   await commentsApi.deleteComment(commentId);
  // };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
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

        {!hasError && visible && <NewCommentForm onSubmit={handleAdd} />}
      </div>
    </div>
  );
};
