/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removePostId, setPostId } from '../features/selectedPost/selectedPost';
import { Post } from '../types/Post';

export const PostsList = () => {
  const posts = useAppSelector(state => state.posts.posts);
  const selectedPostId = useAppSelector(state => state.selectedPost.value);
  const dispatch = useAppDispatch();

  const handleSelectedPost = (post: Post) => {
    if (post.id === selectedPostId?.id) {
      dispatch(removePostId());
    } else {
      dispatch(setPostId(post));
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
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId?.id,
                  })}
                  onClick={() => {
                    handleSelectedPost(post);
                  }}
                >
                  {post.id === selectedPostId?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
