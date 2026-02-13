import { useAppSelector } from '../app/hooks';
import { PostItem } from './PostItem';

export const PostsList = () => {
  const { posts } = useAppSelector(state => state.posts);

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
            <PostItem post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
