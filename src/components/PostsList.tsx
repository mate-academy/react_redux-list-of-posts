import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../types/Post';

import {
  selectAllPosts,
  selectSelectedPostId,
  postSelected,
} from '../features/posts/postsSlice';
import { selectActiveAuthorId } from '../features/users/usersSlice';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();

  const allPosts = useSelector(selectAllPosts);
  const selectedPostId = useSelector(selectSelectedPostId);
  const activeAuthorId = useSelector(selectActiveAuthorId);

  const filteredPosts = useMemo(() => {
    if (activeAuthorId) {
      return allPosts.filter((post: Post) => post.userId === activeAuthorId);
    }

    return allPosts;
  }, [allPosts, activeAuthorId]);

  const handlePostClick = (post: Post) => {
    const newSelectedId = post.id === selectedPostId ? null : post.id;

    dispatch(postSelected(newSelectedId));
  };

  if (filteredPosts.length === 0 && !activeAuthorId) {
    return <p className="title">Nenhum post disponível.</p>;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">
        Posts {activeAuthorId ? `(Autor: #${activeAuthorId})` : 'Todos:'}
      </p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts.map((post: Post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => handlePostClick(post)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
