/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
/*import React, { useEffect } from 'react';*/

import { useAppDispatch, useAppSelector } from '../../app/hooks';
/*import { clearPosts } from '../../features/postsSlice';*/
import { Loader } from '../Loader';
import { selectPost } from '../../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loaded, hasError } = useAppSelector(state => state.posts);
  const selectedPostId = useAppSelector(
    state => state.selectedPost.selectedPostId,
  );

  /*useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);*/

  if (hasError) {
    return <p>{hasError}</p>;
  }

  if (!loaded) {
    return <Loader />;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {items.map(post => (
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
                  onClick={() => {
                    dispatch(
                      selectPost(post.id === selectedPostId ? null : post.id),
                    );
                  }}
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
