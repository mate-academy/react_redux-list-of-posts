import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const LayoutMain = () => (
  <div className="layout">
    <Navbar />

    <div className="layout__content">
      <Outlet />
    </div>
  </div>
);

export default LayoutMain;
