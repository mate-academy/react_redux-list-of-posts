import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader/Loader';
import { selectors, setUserId, loadUsersList } from './redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getLoadingStatus);
  const usersList = useSelector(selectors.getUserList);
  const selectedPost = useSelector(selectors.getPostDetails);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUserId(Number(event.target.value)));
  };

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(setUserId(0));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={selectHandler}>
            <option value="0">All users</option>
            {usersList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading
            ? <Loader />
            : <PostsList />}
        </div>

        <div className="App__content">
          {selectedPost && <PostDetails />}
        </div>
      </main>
    </div>
  );
};

export default App;
