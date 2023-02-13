import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Post } from '../../types/Post';
import { selectUser } from '../users/usersSlice';
import { useGetUserPostsQuery } from './postsApi';
import { selectPostId, setPost } from './postsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const currentPostId = useAppSelector(selectPostId);

  const { data: posts } = useGetUserPostsQuery(currentUser?.id || 0);

  const handlePostSelect = (post: Post | null) => dispatch(setPost(post));

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
          {posts && posts.map(post => (
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
                      'is-light': post.id !== currentPostId,
                    },
                  )}
                  onClick={() => {
                    handlePostSelect(post.id === currentPostId ? null : post);
                  }}
                >
                  {post.id === currentPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
