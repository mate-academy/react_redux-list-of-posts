import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as selectedPostActions from '../features/selectedPost/selectedPost';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const selectedPost = useAppSelector(state => state.selectedPost.post);
  const dispatch = useAppDispatch();

  const selectPost = (curentPost: Post) => {
    // eslint-disable-next-line no-console
    console.log('Clickes');

    if (curentPost.id === selectedPost?.id) {
      dispatch(selectedPostActions.clear());
    } else {
      // eslint-disable-next-line no-console
      console.log('Here');
      dispatch(selectedPostActions.set(curentPost));
    }
  };

  return (
    !posts.length ? (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    ) : (
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
                        'is-light': post.id !== selectedPost?.id,
                      },
                    )}
                    onClick={() => selectPost(post)}
                  >
                    {post.id === selectedPost?.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};
