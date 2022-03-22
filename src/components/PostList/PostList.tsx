import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPostComments, getPostDetails } from '../../helpers/api';
import { LoadPostCommentsAction, LoadPostDetailsAction, LoadPostsAction } from '../../store/actions';
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

  const handlePostDetails = async (postId: number) => {
    const postDetails = await getPostDetails(postId);
    const postComments = await getPostComments(postId);

    dispatch(LoadPostDetailsAction(postDetails));
    dispatch(LoadPostCommentsAction(postComments));
  };

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
              onClick={() => handlePostDetails(post.id)}
            >
              open
              {/* {post.id === selectedPostId ? 'Close' : 'Open'} */}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
