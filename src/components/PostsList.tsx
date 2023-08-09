import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as postActions from '../features/postSlice';

type Props = {
  posts: Post[]
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.post);

  const handleSelectPost = (post: Post) => {
    dispatch(postActions.init(post.id));
    dispatch(postActions.addPost(post));
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
                      'is-light': selectedPost
                      && post.id !== selectedPost.post?.id,
                    },
                  )}
                  onClick={() => handleSelectPost(post)}
                >
                  {selectedPost.post
                  && post.id === selectedPost.post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
