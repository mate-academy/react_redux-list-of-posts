/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { onPostSelected, selectPosts } from '../features/posts/postsSlice';

export const PostsList: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const { posts, selectedPost } = useAppSelector(selectPosts);

  const handleOnPostSelected = (post: Post | null) => {
    dispatch(onPostSelected(post));
  };

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
          {posts.map(post => {
            const selectedPostId =
              typeof selectedPost === 'number'
                ? selectedPost
                : selectedPost?.id;

            return (
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
                      handleOnPostSelected(
                        post.id === selectedPostId ? null : post,
                      );
                    }}
                  >
                    {post.id === selectedPostId ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
