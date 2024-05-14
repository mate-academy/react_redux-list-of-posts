/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React = require('react');
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { selectPostState } from '../features/postsSlice';
import { selectPost, setSelectedPost } from '../features/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsList = () => {
  const dispatch = useDispatch();

  const { posts } = useAppSelector(selectPostState);
  const selectedPost = useAppSelector(selectPost);

  const onPostSelected = (post: Post) => {
    dispatch(setSelectedPost(post.id === selectedPost?.id ? null : post));
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
                    onPostSelected(post);
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
