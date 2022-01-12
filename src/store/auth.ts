import { Dispatch } from 'redux';
import { IUser } from '../types/IUser';
import { AuthAction, AuthActionsEnum, AuthState } from './types/auth';

const initialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: '',
};

export const AuthActionCreators = {
  setUser: (user: IUser) => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean) => ({ type: AuthActionsEnum.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean) => ({ type: AuthActionsEnum.SET_IS_LOADING, payload }),
  setError: (payload: string) => ({ type: AuthActionsEnum.SET_ERROR, payload }),
  login: (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));

      setTimeout(async () => {
        const request = await fetch('./users.json');
        const usersData: IUser[] = await request.json();
        const mockUser = usersData.find(user => user.username
          === username && user.password === password);

        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);

          dispatch(AuthActionCreators.setIsAuth(true));
          dispatch(AuthActionCreators.setUser(mockUser));
        } else {
          dispatch(AuthActionCreators.setError('Некорректный Email или password'));
        }

        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка'));
    }
  },
  logout: () => async (dispatch: Dispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');

    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
        isLoading: false,
      };

    case AuthActionsEnum.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case AuthActionsEnum.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case AuthActionsEnum.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
