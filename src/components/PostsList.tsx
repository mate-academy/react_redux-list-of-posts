import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  actions as selectedPostActions,
} from '../features/slices/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts } = useAppSelector(state => state.posts);

  const selectedPostId = selectedPost?.id ?? 0;

  const dispatch = useAppDispatch();

  const handleOpenClosePost = (post: Post) => {
    dispatch(selectedPostActions.setSelectedPost(
      post.id === selectedPost?.id ? null : post,
    ));
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
                  onClick={() => handleOpenClosePost(post)}
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
