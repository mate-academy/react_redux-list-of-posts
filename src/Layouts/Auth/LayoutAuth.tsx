import { Outlet } from 'react-router-dom';
import classes from './Auth.module.scss';

const LayoutAuth = () => {
  return (
    <div className={classes.auth}>
      <div className={classes.auth__left} />
      <div className={classes.auth__right}>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAuth;
