/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostById, getPosts } from '../../api/posts';
import { setPostsAction, setSelectedPostId } from '../../store';
import {
  getPostsSelector,
  getSelectedPostId,
  getSelectedUserId,
  getUserPosts,
} from '../../store/selectors';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserId);
  const selectedPostId = useSelector(getSelectedPostId);

  const posts = useSelector(selectedUserId === 0
    ? getPostsSelector
    : getUserPosts(selectedUserId));

  const dispatch = useDispatch();

  const loadPosts = async () => {
    try {
      const postsFromServer = await getPosts();

      dispatch(setPostsAction(postsFromServer));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  async function deletePost(postId: number) {
    try {
      await deletePostById(postId);
      await loadPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}] `}</b>
              {post.title}
            </div>
            <div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(setSelectedPostId(selectedPostId === post.id
                    ? 0
                    : post.id));
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
              <button
                type="button"
                className="button PostsList__delete-button"
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                &#128465;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
