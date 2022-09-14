import classNames from 'classnames';

import { PostDetails } from '../PostDetails/PostDetails';

import { useAppSelector } from '../../redux/hooks';

import './Sidebar.scss';

export const Sidebar: React.FC = () => {
  const { currentPost } = useAppSelector(state => state.posts);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        {
          'Sidebar--open': currentPost,
        },
      )}
    >
      <div className="tile is-child box is-success">
        <PostDetails />
      </div>
    </div>
  );
};
