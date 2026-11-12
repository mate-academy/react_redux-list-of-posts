import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { selectPost } from '../features/selectedPost/selectedPost';
import { Post } from '../types/Post';

export const PostsList = () => {
  const posts = useAppSelector(state => state.posts.items);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  const dispatch = useDispatch<AppDispatch>();

  const choosePost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(selectPost(null));

      return;
    }

    dispatch(selectPost(post));
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
                  onClick={() => choosePost(post)}
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
