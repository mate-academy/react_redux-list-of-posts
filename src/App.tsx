import React, { useCallback, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  changeSelectedPostId,
  changeSelectedUserId, loadPosts, loadUsers, selectors,
} from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.getPosts);
  const users = useSelector(selectors.getUsers);
  const selectedUserId = useSelector(selectors.getSelectedUserId);
  const selectedPostId = useSelector(selectors.getSelectedPostId);
  const loadUsersError = useSelector(selectors.getLoadUsersError);
  const loadPostsError = useSelector(selectors.getLoadPostsError);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    dispatch(loadPosts(selectedUserId));
  }, [selectedUserId]);

  const handleSelectedUserId = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(changeSelectedUserId(Number(event.target.value)));
  }, [selectedUserId]);

  const handleSelectedPostId = useCallback((postId: number | null) => {
    dispatch(changeSelectedPostId(postId));
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          <span>Select a user: </span>

          {loadUsersError ? (
            <h1>Failed to load users</h1>
          ) : (
            <select
              className="App__user-selector"
              value={selectedUserId}
              onChange={handleSelectedUserId}
            >
              <option value="0">All users</option>
              {users?.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {loadPostsError ? (
            <h1>Failed to load posts</h1>
          ) : (
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              handleSelectedPostId={handleSelectedPostId}
              reloadPosts={() => dispatch(loadPosts(selectedUserId))}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPostId && selectedPostId > 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
