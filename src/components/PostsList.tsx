import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as postsActions from '../features/postsSlice';

export const PostsList: React.FC = () => {
  const dispach = useAppDispatch();
  const { posts, selectedPost } = useAppSelector(state => state.posts);
  const onPostSelected = (post: Post | null) => {
    dispach(postsActions.setSelectedPost(post));
  };

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedPostId(selectedPost ? selectedPost.id : null);
  }, [selectedPost]);

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
                  onClick={() => {
                    onPostSelected(post.id === selectedPostId ? null : post);
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
