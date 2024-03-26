/* eslint-disable jsx-a11y/control-has-associated-label */
import { useAppSelector } from '../app/hooks';
import { PostItem } from './PostItem';

export const PostsList = () => {
  const { items } = useAppSelector(state => state.posts);

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
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
