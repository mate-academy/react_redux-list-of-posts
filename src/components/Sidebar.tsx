import React from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { useAppSelector } from '../app/hooks';

export const Sidebar: React.FC = () => {
  const selectedPost = useAppSelector(state => state.selectedPost);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': selectedPost,
      })}
    >
      <div className="tile is-child box is-success">
        {selectedPost && <PostDetails />}
      </div>
    </div>
  );
};
