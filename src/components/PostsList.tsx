import classNames from 'classnames';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList = () => {
  const { posts } = useAppSelector(
    (state: RootState) => state.posts,
  );

  const { selectedPost } = useAppSelector(
    (state: RootState) => state.selectedPost,
  );

  const dispatch = useAppDispatch();

  const handleSelectPost = (id: number, title: string, body: string) => {
    return id === selectedPost?.id ? null : { id, title, body };
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
          {posts.map(({ id, title, body }: Post) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>
              <td data-cy="PostTitle">{title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(setSelectedPost(
                      handleSelectPost(id, title, body),
                    ));
                  }}
                >
                  {id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
