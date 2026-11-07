/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
// import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import {
  addPost,
  clearSelectedPost,
} from '../features/counter/Posts/postSelectedSlice';

export const PostsList: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.userIdPosts);
  const userId = useAppSelector(state => state.posts.userSelected);
  const selectedPost = useAppSelector(state => state.setPost.postSelected);

  useEffect(() => {}, [posts, userId]);
  function onPostSelected(post: Post) {
    if (selectedPost === null) {
      return dispatch(addPost(post));
    }

    if (post.id === selectedPost.id) {
      return dispatch(clearSelectedPost());
    }

    return dispatch(addPost(post));
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
