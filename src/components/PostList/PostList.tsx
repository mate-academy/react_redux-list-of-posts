import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../helpers/api';
import { LoadPostsAction } from '../../store/actions';
import { getPostsSelector } from '../../store/selectors';
import './PostList.scss';

export const PostList: React.FC = () => {
  const dispatch = useDispatch();

  const posts: Post[] = useSelector(getPostsSelector);

  useEffect(() => {
    const loadPostsFromServer = async () => {
      const postsFromServer = await fetchPosts();

      dispatch(LoadPostsAction(postsFromServer));
    };

    loadPostsFromServer();
  }, []);

  return (
    <section className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              // onClick={() => handlePostId(post.id)}
            >
              Open
              {/* {post.id === selectedPostId ? 'Close' : 'Open'} */}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
