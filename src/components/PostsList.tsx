import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import { closeSelected, setSelected } from '../features/posts/selectedPost';

type Props = {
  posts: Post[],
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (post: Post) => {
    if (post.id !== selectedPostId) {
      dispatch(setSelected(post));
    } else {
      dispatch(closeSelected());
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
                  onClick={() => handleClick(post)}
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
