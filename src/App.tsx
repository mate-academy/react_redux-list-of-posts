import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import './styles/general.scss';

import { Start } from './components/Start';
import { Filters } from './components/Filters';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { ErrorOnLoad } from './components/ErrorPostLoad';

import { isLoading, isErrorPost, isErrorTextPostDetails, getPostId } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const isLoadErrorPost = useSelector(isErrorPost);
  const isLoadErrorPostDetails = useSelector(isErrorTextPostDetails);
  const postId = useSelector(getPostId);

  return (
    <div className="App">
      <h2>{loading ? 'Loading...' : 'Redux list of posts:'}</h2>
      {isLoadErrorPost && <Start />}
      <div className="App">
        {!isLoadErrorPost && <Filters /> }
        
        <main className="App__main">
          <div className="App__sidebar">
            {!isLoadErrorPost
              ? (<PostsList />)
              : (<ErrorOnLoad />)
            }
          </div>

          <div className="App__content">
            {isLoadErrorPostDetails === false && postId !== 0
              ? <PostDetails />
              : <h3>No Posts Details </h3>
            }
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
