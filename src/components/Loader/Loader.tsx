import { Spinner } from 'react-bootstrap';
import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={classes.wrapperSpinner}>
      <Spinner animation="grow" />
    </div>
  );
};

export default Loader;
