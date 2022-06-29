import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../helpers/posts';
import { setPosts } from '../../store';
import {
  getPostsByUserIdSelector, getPostsSelector,
} from '../../store/selectors';
import './PostList.scss';

type Props = {
  userId: string;
  onPostIdHandler: (postId: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  userId, onPostIdHandler, selectedPostId,
}) => {
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);
  const userPostsByUserId = useSelector(getPostsByUserIdSelector(+userId));

  useEffect(() => {
    const getPostsFromServer = async () => {
      const postsFromServer = await getPosts();

      dispatch(setPosts(postsFromServer));
    };

    getPostsFromServer();
  }, []);

  useEffect(() => {
    dispatch(setPosts(userPostsByUserId));
  }, [userId]);

  const clickHandler = (postId: number) => {
    if (selectedPostId !== postId) {
      onPostIdHandler(postId);
    } else {
      onPostIdHandler(null);
    }
  };

  const removePost = async (postId: number) => {
    await deletePost(postId);

    const postsFromServer = await getPosts();

    dispatch(setPosts(postsFromServer));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`User# ${post.userId}`}</b>
              {post.title}
            </div>
            <div className="buttons">
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => clickHandler(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => removePost(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
