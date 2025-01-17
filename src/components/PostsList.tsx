import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onPostSelected: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onPostSelected,
}) => (
  <div>
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td className="has-text-right">
              <button
                className={classNames('button', {
                  'is-light': selectedPostId !== post.id,
                  'is-link': selectedPostId === post.id,
                })}
                onClick={() =>
                  onPostSelected(selectedPostId === post.id ? null : post)
                }
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
