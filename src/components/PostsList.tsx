/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useFetchUserPostsQuery } from '../features/users/user-api-slice';
import { setPost } from '../features/users/user-slice';
import { Post } from '../types/Post';

export const PostsList: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.select.post);
  const author = useAppSelector(state => state.select.author);
  const { data: posts = [] } = useFetchUserPostsQuery(author?.id);

  const handlePostClick = (post: Post) => {
    return post.id === selectedPost?.id
      ? dispatch(setPost(null))
      : dispatch(setPost(post));
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
