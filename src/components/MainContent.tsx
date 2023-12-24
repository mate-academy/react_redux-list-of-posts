import React from 'react';
import { useAppSelector } from '../app/hooks';
import { PostsList } from './PostsList';

export const MainContent: React.FC = () => {
  const {
    author,
  } = useAppSelector(state => state.author);

  if (!author) {
    return (
      <p data-cy="NoSelectedUser">
        No user selected
      </p>
    );
  }

  return (
    <PostsList user={author} />
  );
};
