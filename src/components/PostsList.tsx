import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as selectedPostActions from '../slices/selectedPostSlice';

export const PostsList = () => {
  const {
    items: posts,
  } = useAppSelector(store => store.posts);

  const {
    selectedPost,
  } = useAppSelector(store => store.selectedPost);
  const dispatch = useAppDispatch();

  const selectedPostId = selectedPost?.id ?? 0;

  const handleSelectPost = (post: null | Post) => {
    dispatch(selectedPostActions.selectPost(post));
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            { // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <th> </th>
            }
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
                    handleSelectPost(post.id === selectedPostId ? null : post);
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
