import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/usersSlice/usersSlice';
import { RootState } from '../app/store';
import { setUser } from '../features/authorSlice/authorSlice';

export const UserSelector: React.FC = () => {
  const { users } = useAppSelector((state: RootState) => state.users);
  const { author } = useAppSelector((state: RootState) => state.author);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // we don't want to listening for outside clicks
    // when the Dopdown is closed
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(setUser(user));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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

//   const users = useContext(UserContext);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     if (!expanded) {
//       return;
//     }

//     // we save a link to remove the listener later
//     const handleDocumentClick = () => {
//       // we close the Dropdown on any click (inside or outside)
//       // So there is not need to check if we clicked inside the list
//       setExpanded(false);
//     };

//     document.addEventListener('click', handleDocumentClick);

//     // eslint-disable-next-line consistent-return
//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//     // we don't want to listening for outside clicks
//     // when the Dopdown is closed
//   }, [expanded]);

//   return (
//     <div
//       data-cy="UserSelector"
//       className={classNames('dropdown', { 'is-active': expanded })}
//     >
//       <div className="dropdown-trigger">
//         <button
//           type="button"
//           className="button"
//           aria-haspopup="true"
//           aria-controls="dropdown-menu"
//           onClick={e => {
//             e.stopPropagation();
//             setExpanded(current => !current);
//           }}
//         >
//           <span>{selectedUser?.name || 'Choose a user'}</span>

//           <span className="icon is-small">
//             <i className="fas fa-angle-down" aria-hidden="true" />
//           </span>
//         </button>
//       </div>

//       <div className="dropdown-menu" id="dropdown-menu" role="menu">
//         <div className="dropdown-content">
//           {users.map(user => (
//             <a
//               key={user.id}
//               href={`#user-${user.id}`}
//               onClick={() => {
//                 onChange(user);
//               }}
//               className={classNames('dropdown-item', {
//                 'is-active': user.id === selectedUser?.id,
//               })}
//             >
//               {user.name}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
