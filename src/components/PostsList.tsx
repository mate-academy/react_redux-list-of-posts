import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { set as setSelectedPost } from '../features/selectedPost';

export const PostsList = () => {
  const { items } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(
    state => state.selectedPost,
  ) as Post | null;

  const isThisPostSelected = (postId: number) => postId === selectedPost?.id;

  const handleClick = (post: Post) => {
    if (selectedPost && selectedPost.id === post.id) {
      dispatch(setSelectedPost(null));
    } else {
      dispatch(setSelectedPost(post));
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
          {items.map(post => (
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
                      'is-light': !isThisPostSelected(post.id),
                    },
                  )}
                  onClick={() => handleClick(post)}
                >
                  {isThisPostSelected(post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
