import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { selectedPost as setSelectedPostAction } from '../slices/selectedPost';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.items);
  const selectedPostId = useAppSelector(state => state.selectedPost.value?.id);

  const handlePostSelect = (post: Post | null) => {
    dispatch(setSelectedPostAction(post));
  };

  if (posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
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
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() =>
                    handlePostSelect(post.id === selectedPostId ? null : post)
                  }
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
