import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectPost } from '../slices/postsSlice';
import { fetchUsers } from '../slices/usersSlice';
import { fetchComments, resetComments } from '../slices/commentsSlice';
import type { RootState, AppDispatch } from '../app/store';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
    selectedPostId,
  } = useSelector((state: RootState) => state.posts);

  const { items: users, loaded: usersLoaded } = useSelector(
    (state: RootState) => state.users,
  );

  const {
    items: comments,
    loaded: commentsLoaded,
    hasError: commentsError,
  } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSelectPost = (id: number) => {
    dispatch(selectPost(id));
    if (selectedPostId !== id) {
      dispatch(fetchComments(id));
    } else {
      dispatch(resetComments());
    }
  };

  const getAuthorName = (userId: number) =>
    users.find(user => user.id === userId)?.name || 'Desconhecido';

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
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title - Autor</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
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
          onClick={() => dispatch(selectPost(null))}
          className="button is-warning ml-2"
        >
          Desselecionar
        </button>
      </div>
    </div>
  );
};
