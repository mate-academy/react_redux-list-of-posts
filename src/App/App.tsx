import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Search } from '../components/Search';
import { Button } from '../components/Button';
import { PostList } from '../components/PostList';

import { loadData } from '../store/actions';
import { InitialState } from '../constants/types';
import './App.css';

interface StateProps {
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: boolean;
}


export const App: FC = () => {
  const {
    isLoading, isLoadSuccess, isLoadError,
  } = useSelector<InitialState, StateProps>((state: InitialState) => ({
    isLoading: state.isLoading,
    isLoadSuccess: state.isLoadSuccess,
    isLoadError: state.isLoadError,
  }));

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(loadData());
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

      {isLoadSuccess && <PostList />}
    </div>
  );
};
