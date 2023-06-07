/* eslint-disable no-console */
import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import * as selectedPostActions from '../features/postDetail/postDetailSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

type Props = {
  posts: Post[],
};

export const PostsList: React.FC<Props> = ({
  posts,
}) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectedPostActions.selectedPost);

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
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    if (post.id === selectedPost?.id) {
                      console.log('empty');
                      dispatch(selectedPostActions.setEmptyPost());
                    } else {
                      dispatch(selectedPostActions.setSelectedPost(post));
                      console.log('selected');
                    }
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
