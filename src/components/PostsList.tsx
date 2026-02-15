import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setSelectedPost } from '../features/selectedPost';
import { Post } from '../types/Post';
import { RootState } from '../app/store';
export const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const dispatch = useDispatch();
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );
  const selectedPostId = selectedPost?.id;

  const onPostSelected = (post: Post) => {
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
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => onPostSelected(post)}
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
