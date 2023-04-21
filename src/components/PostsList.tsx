import classNames from 'classnames';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPostsState } from '../features/postsSlice';
import {
  selectSelectedPost,
  set as setSelectedPost,
} from '../features/selectedPost';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { items: posts } = useAppSelector(selectPostsState);
  const selectedPostId = useAppSelector(selectSelectedPost)?.id;

  const handleButtonClick = (post: Post) => {
    dispatch(setSelectedPost(post.id === selectedPostId ? null : post));
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
                  onClick={() => handleButtonClick(post)}
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
