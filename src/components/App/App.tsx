import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Search } from '../Search/Search';
import { Button } from '../Button/Button';

import { InitialState, FullPost } from '../../constants/types';
import { RootDispatcher } from '../../store/root-reducer';
import './App.css';

interface StateProps {
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: boolean;
  posts: FullPost[];
}


export const App: FC = () => {
  const {
    isLoading, isLoadSuccess, isLoadError, posts,
  } = useSelector<InitialState, StateProps>((state: InitialState) => ({
    isLoading: state.isLoading,
    isLoadSuccess: state.isLoadSuccess,
    isLoadError: state.isLoadError,
    posts: state.posts,
  }));

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const handleButtonClick = () => {
    rootDispatcher.loadData();
  };

  const renderButton = () => {
    if (isLoadSuccess) {
      return null;
    }

    if (isLoading) {
      return (
        <Button disabled>
          Loading...
        </Button>
      );
    }

    if (isLoadError) {
      return (
        <Button onClick={handleButtonClick}>
          Try again
        </Button>
      );
    }

    return (
      <Button onClick={handleButtonClick}>
        Load Posts
      </Button>
    );
  };

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <hr />
      <Search />

      {renderButton()}
      {isLoadSuccess ? (
        posts.map(post => (
          <li>
            {post.id}
          </li>
        ))
      ) : ''}
    </div>
  );
};
