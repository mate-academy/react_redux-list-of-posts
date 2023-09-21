import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { actions as selectedPostActions } from '../features/selectedPostSlice';

type Props = {
  posts: Post[],
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
}) => {
  const dispatch = useDispatch();
  const onPostChange = (postToSet: Post | null) => {
    if (postToSet === null) {
      dispatch(selectedPostActions.clearPost());
    } else {
      dispatch(selectedPostActions.setPost(postToSet));
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
                  onClick={() => {
                    onPostChange(post.id === selectedPostId ? null : post);
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
