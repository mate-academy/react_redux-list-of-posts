import React from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPosts } from '../features/posts/postsSlice';
import {
  selectPost,
  removeSelectedPost,
  setSelectedPost,
} from '../features/selectedPost/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { items: posts } = useAppSelector(selectPosts);
  const selectedPost = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  const selectedPostId = selectedPost?.id || 0;

  const onPostSelect = (post: Post) => {
    if (post.id === selectedPostId) {
      dispatch(removeSelectedPost());
    } else {
      dispatch(setSelectedPost(post));
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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => onPostSelect(post)}
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
