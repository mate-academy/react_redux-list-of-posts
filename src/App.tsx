import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LayoutMain from './Layouts/Main/LayoutMain';
import { HomePage } from './Pages/HomePage';
import { PostsPage } from './Pages/PostsPage';
import LayoutAuth from './Layouts/Auth/LayoutAuth';
import { useTypedSelector } from './hooks/useTypedSelector';
import { LoginPage } from './Pages/LoginPage';
import { AuthActionCreators } from './store/auth';
import { IUser } from './types/IUser';

import './App.scss';

const App = () => {
  const { isAuth } = useTypedSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(AuthActionCreators.setUser({ username: localStorage.getItem('username' || '') } as IUser));
      dispatch(AuthActionCreators.setIsAuth(true));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {
          isAuth ? (
            <Route path="/" element={<LayoutMain />}>
              <Route index element={<HomePage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="login" element={<Navigate to="/" />} />
            </Route>
          ) : (
            <Route path="/*" element={<LayoutAuth />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
