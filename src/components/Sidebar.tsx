import cn from 'classnames';
import { PostDetails } from './Posts/PostDetails';
import { useAppSelector } from '../app/hooks';

export const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);

  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': isSidebarOpen,
      })}
    >
      <div className="tile is-child box is-success ">
        <PostDetails />
      </div>
    </div>
  );
};
