import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import {
  actions as selectedPostActions,
} from '../features/selectedPost/selectedPostSlice';

type Props = {
  posts: Post[],
};

export const PostsList: React.FC<Props> = ({
  posts,
}) => {
  const dispatch = useAppDispatch();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!selectedPost) {
      dispatch(selectedPostActions.clear());
    }

    if (selectedPost) {
      dispatch(selectedPostActions.take({
        posts, selectedPostId: selectedPost.id,
      }));
    }
  }, [posts, selectedPost]);

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
                    setSelectedPost(post.id === selectedPost?.id ? null : post);
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
