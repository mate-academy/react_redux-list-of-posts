import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthActionCreators } from '../../../store/auth';
import { Logo } from './Logo';

const MENU_LINK = [
  {
    label: 'Posts',
    path: '/posts',
  },
];

interface MenuItem {
  label: string,
  path: string
}

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthActionCreators.logout());
  };

  return (
    <div className="layout__navbar">
      <Logo />

      <ul className="navbar-list">
        {MENU_LINK.map((link: MenuItem) => (
          <li
            key={link.label}
            className="navbar-list__item"
          >
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'navbar-list__link navbar-list__link--active' : 'navbar-list__link')}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleLogout}
        className="btn btn-light ms-3"
      >
        Logout
      </button>
    </div>
  );
};
