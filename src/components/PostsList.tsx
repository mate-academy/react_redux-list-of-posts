/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { Post } from '../types/Post';
import {
  selectSelectedPost,
  setSelectedPost,
} from '../features/slices/selectedPostSlice';
import { selectPostsList } from '../features/slices/postsSlice';

export const PostsList = () => {
  const dispatch = useDispatch();
  const items = useAppSelector(selectPostsList);
  const selectedPost = useAppSelector(selectSelectedPost);

  const handleSelectedPost = (post: Post) =>
    dispatch(setSelectedPost(post.id === selectedPost?.id ? null : post));

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
          {items.map(post => (
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
                  onClick={() => handleSelectedPost(post)}
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
