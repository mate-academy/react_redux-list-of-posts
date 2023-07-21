import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearSelectedPost, setSelectedPost } from '../features/selectedPost';

export const PostsList = () => {
  const { posts } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const handleChangeSelectedPost = (id: number) => {
    const newSelectedPost = posts.find(post => post.id === id);

    if (newSelectedPost && selectedPost?.id !== id) {
      dispatch(setSelectedPost(newSelectedPost));
    } else {
      dispatch(clearSelectedPost());
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
          {posts.map(({ id, title }) => {
            const isSelected = selectedPost?.id === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">
                  {id}
                </td>
                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      {
                        'is-light': !isSelected,
                      },
                    )}
                    onClick={() => handleChangeSelectedPost(id)}
                  >
                    {isSelected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
