import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { actions as authorActions } from '../features/authorSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(state => state.posts);
  const { setSelectedPost } = useAppSelector(state => state.author);

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
          {posts.map((post: Post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== setSelectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(
                      // eslint-disable-next-line max-len
                      authorActions.setSelectedPost(post.id === setSelectedPost?.id
                        ? null
                        : post),
                    );
                  }}
                >
                  {post.id === setSelectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
