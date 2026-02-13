/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { selectedPostSlice } from '../features/selectedPost';
import { newFormSlice } from '../features/newCommentForm';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { items: posts } = useAppSelector(state => state.posts);
  const { item: selectedPost } = useAppSelector(state => state.selectedPost);

  const handlePostSelection = (post: Post) => {
    if (post.id === selectedPost?.id) {
      dispatch(selectedPostSlice.actions.set(null));
    } else {
      dispatch(selectedPostSlice.actions.set(post));
    }

    dispatch(newFormSlice.actions.clearAll());
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
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => handlePostSelection(post)}
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
