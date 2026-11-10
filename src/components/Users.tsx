import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { AppDispatch } from '../app/store';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { loadUserPosts } from '../features/userPosts/userPostsThunk';
import { setAuthor } from '../features/author/authorSlice';
import { selectPost } from '../features/selectedPost/selectedPost';

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector(state => state.users.value);
  const author = useAppSelector(state => state.author.value);
  const [expanded, setExpanded] = useState(false);
  const loadedUserIds = useAppSelector(state => state.userPosts.loadedUserIds);
  const usersStatus = useAppSelector(state => state.users.status);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{author?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersStatus === 'loaded' &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => {
                  dispatch(selectPost(null));
                  dispatch(setAuthor(user));

                  if (!loadedUserIds.includes(user.id)) {
                    dispatch(loadUserPosts(user.id));
                  }
                }}
                className={classNames('dropdown-item', {
                  'is-active': author?.id === user.id,
                })}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
