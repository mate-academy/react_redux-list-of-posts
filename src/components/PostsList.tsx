import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchComments, resetComments } from '../features/comments/commentsSlice';
import { setSelectedPostId, clearSelectedPostId } from '../features/selectedPost/selectedPostSlice';
import { setSelectedAuthor, clearSelectedAuthor } from '../features/selectedAuthor/selectedAuthorSlice';
import type { RootState, AppDispatch } from '../app/store';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useSelector((state: RootState) => state.posts);

  const { items: users, loaded: usersLoaded } = useSelector(
    (state: RootState) => state.users,
  );

  const {
    items: comments,
    loaded: commentsLoaded,
    hasError: commentsError,
  } = useSelector((state: RootState) => state.comments);

  const selectedPostId = useSelector(
    (state: RootState) => state.selectedPost.selectedPostId,
  );

  const selectedAuthorId = useSelector(
    (state: RootState) => state.selectedAuthor.authorId,
  );

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSelectPost = (id: number) => {
    if (selectedPostId !== id) {
      dispatch(setSelectedPostId(id));
      dispatch(fetchComments(id));
    } else {
      dispatch(clearSelectedPostId());
      dispatch(resetComments());
    }
  };

  const getAuthorName = (userId: number) =>
    users.find(user => user.id === userId)?.name || 'Desconhecido';

  const filteredPosts = selectedAuthorId
    ? posts.filter(post => post.userId === selectedAuthorId)
    : posts;

  if (!postsLoaded || !usersLoaded) {
    return <p>Carregando...</p>;
  }

  if (postsError) {
    return <p>Erro ao carregar posts.</p>;
  }

  return (
    /* eslint-disable @typescript-eslint/indent */
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <div className="field mb-4">
        <label className="label">Filtrar por autor:</label>
        <div className="control">
          <div className="select">
            <select
              value={selectedAuthorId ?? ''}
              onChange={e => {
                const value = e.target.value;
                if (value === '') {
                  dispatch(clearSelectedAuthor());
                } else {
                  dispatch(setSelectedAuthor(Number(value)));
                }
              }}
            >
              <option value="">Todos</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title - Autor</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(post => (
            <React.Fragment key={post.id}>
              <tr data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">
                  {post.title} - {getAuthorName(post.userId)}
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': post.id !== selectedPostId,
                    })}
                    onClick={() => handleSelectPost(post.id)}
                  >
                    {post.id === selectedPostId ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>

              {selectedPostId === post.id &&
                commentsLoaded &&
                !commentsError && (
                  <tr>
                    <td colSpan={3}>
                      <div className="ml-4 mt-2">
                        <p className="subtitle">Comentários:</p>
                        <ul>
                          {comments.map(comment => (
                            <li key={comment.id}>
                              <strong>{comment.name}</strong>: {comment.body}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="buttons mt-3">
        <button
          onClick={() => dispatch(fetchPosts())}
          className="button is-primary"
        >
          Recarregar Posts
        </button>
        <button
          onClick={() => {
            dispatch(clearSelectedPostId());
            dispatch(resetComments());
          }}
          className="button is-warning ml-2"
        >
          Desselecionar
        </button>
      </div>
    </div>
  );
};
