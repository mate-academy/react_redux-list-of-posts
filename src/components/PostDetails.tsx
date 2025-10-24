// src/components/PostDetails.tsx

import React, { useEffect, useState } from 'react';
// ⚠️ SUBSTITUA PELOS HOOKS TIPADOS:
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// Importação dos Tipos
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { User } from '../types/User';

// 1. IMPORTAÇÕES DO REDUX E THUNKS
import {
  selectSelectedPostId,
  selectPostById, // Seletor do postsSlice
} from '../features/posts/postsSlice';
import {
  fetchComments,
  addNewComment,
  commentDeleted,
  selectComments,
} from '../features/comments/commentsSlice';
import { selectAllUsers } from '../features/users/usersSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch(); // Usando hook tipado

  // 2. LER O ESTADO DO REDUX
  const selectedPostId = useAppSelector(selectSelectedPostId);

  // ⚠️ RESOLVIDO: O seletor agora usa RootState tipado via useAppSelector
  const post: Post | undefined = useAppSelector(state =>
    selectPostById(state, selectedPostId),
  );

  const comments: Comment[] = useAppSelector(selectComments);
  const users: User[] = useAppSelector(selectAllUsers);

  // ⚠️ Variáveis mock (Substitua pelos seletores reais quando prontos)
  const loaded = true;
  const hasError = false;
  const postAuthor: User | undefined = users.find(
    user => user.id === post?.userId,
  );

  // 3. ESTADO LOCAL (MANTIDO CONFORME REQUISITO)
  const [visible, setVisible] = useState(false);

  // 4. EFEITO: Disparar a busca por comentários
  useEffect(() => {
    // ⚠️ RESOLVIDO: O dispatch do Thunk não precisa mais de 'as any'
    if (selectedPostId !== null && typeof selectedPostId === 'number') {
      dispatch(fetchComments(selectedPostId));
    }
  }, [dispatch, selectedPostId]);

  if (!post) {
    return null;
  }

  // 5. FUNÇÕES DE REDUX (CRUD)

  // FUNÇÃO DE CRIAÇÃO (Dispara o Thunk)
  const addComment = (data: CommentData) => {
    const newCommentPayload = {
      ...data,
      postId: post.id,
    };

    // ⚠️ RESOLVIDO: O dispatch do Thunk não precisa mais de 'as any'
    dispatch(addNewComment(newCommentPayload));
    setVisible(false);
  };

  // FUNÇÃO DE EXCLUSÃO (Dispara a Action síncrona)
  const handleDeleteComment = (commentId: number) => {
    dispatch(commentDeleted(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p>
          <strong>Autor:</strong>{' '}
          {postAuthor?.name || `Usuário #${post.userId}`}
        </p>

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
            <button
              type="button"
              className="button is-link is-light mb-4"
              onClick={() => setVisible(true)}
            >
              Escrever um comentário
            </button>

            {comments.map((comment: Comment) => (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {/* Formulário visível apenas se o estado local for true */}
        {visible && (
          <NewCommentForm
            onSubmit={addComment}
            onCancel={() => setVisible(false)}
          />
        )}
      </div>
    </div>
  );
};
