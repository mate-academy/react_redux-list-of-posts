import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { PostDetails } from './PostDetails';

const Sidebar = () => {
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        {
          'Sidebar--open': selectedPost,
        },
      )}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && (
          <PostDetails />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
