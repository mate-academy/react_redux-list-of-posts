import React from 'react';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  // const [selectedUser] = useState('0');
  // const selectedUser: string = useSelector(getUserId);

  // const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // const handleSelectedPost = useCallback((id: number) => {
  //   if (selectedPostId === id) {
  //     setSelectedPostId(null);
  //   } else {
  //     setSelectedPostId(id);
  //   }
  // }, [selectedPostId]);

  // const handleSelectedUser = useCallback((id: string) => {
  //   setSelectedUser(id);
  // dispatch(setUserId);
  // }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect />
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
