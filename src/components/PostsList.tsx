/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// eslint-disable-next-line max-len
import * as selectedPostActions from '../features/selectedPost/selectedPostSlice';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { post: selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  if (!loaded) {
    return (
      <div data-cy="PostsList">
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div data-cy="PostsList">
        <p>Error</p>
      </div>
    );
  }

  const handleSelectPost = (newPost: Post) => {
    if (!selectedPost || newPost.id !== selectedPost.id) {
      dispatch(selectedPostActions.set(newPost));
    } else {
      dispatch(selectedPostActions.set(null));
    }
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
                    handleSelectPost(post);
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
