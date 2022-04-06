import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/hooks';
import { userSlice } from './store/reducers/UserSlice';
import { fetchUsers } from './store/reducers/ActionCreators';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const { users, areUsersLoading, selectedUserId } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const { setSelectedUserId } = userSlice.actions;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {areUsersLoading
          ? (<Loader />)
          : (
            <label htmlFor="select-user">
              Select a user: &nbsp;
              <select
                value={selectedUserId?.toString()}
                onChange={event => dispatch(setSelectedUserId(Number(event.target.value)))}
                className="App__user-selector"
                id="select-user"
              >
                <option value={undefined}>All users</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
          )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
