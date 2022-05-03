/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import { useGetUsersQuery } from './service/usersApi';

export const App: React.FC = React.memo(() => {
  const { data, error, isLoading } = useGetUsersQuery();
  const preperedArray = data?.slice(0, 8);

  console.log(error);
  console.log(isLoading);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector">
            <option defaultValue="0">All users</option>
            {preperedArray?.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {/* <PostsList
            posts={posts}
            selectedPost={selectedPostId}
            selectPost={setSelectedPostId}
          /> */}
        </div>

        <div className="App__content">
          {/* {!!selectedPostId
        && <PostDetails selectedPost={selectedPostId} />} */}
        </div>
      </main>
    </div>
  );
});
