import { useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserByName } from './api/users';
import { getPostComments } from './api/comments';

import { Loader } from './components/Loader';
import { getPostDetails } from './api/posts';

import {
  getIsPostLoadingSelector,
  getSelectedPostIdSelector,
  getSelectedPostSelector,
  getSelectValueSelector,
  getUserSelector,
} from './store/PostsReducer/selectors';
import {
  setIsPostLoadingAction,
  setSelectedPostAction,
  setSelectedPostIdAction,
  setSelectValueAction,
  setUserAction,
} from './store/PostsReducer/actions';
import { setSelectedPostCommentsAction } from './store/CommentsReducer/actions';

const App: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);
  const selectedPostId = useSelector(getSelectedPostIdSelector);
  const selectValue = useSelector(getSelectValueSelector);
  const selectedPost = useSelector(getSelectedPostSelector);
  const isPostLoading = useSelector(getIsPostLoadingSelector);

  const getPostFromServerByID = useCallback(async () => {
    try {
      if (selectedPostId) {
        const commentsPromise = getPostComments(selectedPostId);
        const currentPost = await getPostDetails(selectedPostId);
        const currentPostComments = await commentsPromise;

        dispatch(setIsPostLoadingAction(false));
        dispatch(setSelectedPostAction(currentPost));
        dispatch(setSelectedPostCommentsAction(currentPostComments));
      }
    } catch (error) {
      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostAction(null));
      dispatch(setSelectedPostCommentsAction([]));
    }
  }, [selectedPostId]);

  const getCommentsFromServer = useCallback(async () => {
    try {
      if (selectedPostId) {
        const currentPostComments = await getPostComments(selectedPostId);

        dispatch(setSelectedPostCommentsAction(currentPostComments));
      }
    } catch (error) {
      dispatch(setSelectedPostCommentsAction([]));
    }
  }, [selectedPostId]);

  const getUserByNameFromServer = useCallback(async (username: string) => {
    try {
      const userArr = await getUserByName(username);

      dispatch(setUserAction(userArr[0]));
      dispatch(setSelectedPostIdAction(null));
    } catch (error) {
      dispatch(setUserAction(null));
    }
  }, []);

  const handleOpenPostDetails = useCallback((id: number) => {
    if (selectedPostId === id) {
      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostIdAction(null));
      dispatch(setSelectedPostAction(null));
      dispatch(setSelectedPostCommentsAction([]));

      return;
    }

    dispatch(setSelectedPostAction(null));
    dispatch(setSelectedPostCommentsAction([]));
    dispatch(setIsPostLoadingAction(true));
    dispatch(setSelectedPostIdAction(id));
  }, [selectedPostId]);

  const handleSelectUser = useCallback((value: string) => {
    dispatch(setSelectValueAction(value));
    dispatch(setUserAction(null));

    if (value === 'All users') {
      return;
    }

    getUserByNameFromServer(value);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectValue}
            onChange={({ target }) => handleSelectUser(target.value)}
          >
            <option value="All users">
              All users
            </option>

            <option value="Leanne Graham">
              Leanne Graham
            </option>

            <option value="Ervin Howell">
              Ervin Howell
            </option>

            <option value="Clementine Bauch">
              Clementine Bauch
            </option>

            <option value="Patricia Lebsack">
              Patricia Lebsack
            </option>

            <option value="Chelsey Dietrich">
              Chelsey Dietrich
            </option>

            <option value="Mrs. Dennis Schulist">
              Mrs. Dennis Schulist
            </option>

            <option value="Kurtis Weissnat">
              Kurtis Weissnat
            </option>

            <option value="Nicholas Runolfsdottir V">
              Nicholas Runolfsdottir V
            </option>

            <option value="Glenna Reichert">
              Glenna Reichert
            </option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            user={user}
            selectedPostId={selectedPostId}
            selectValue={selectValue}
            handleOpenPostDetails={handleOpenPostDetails}
            getPostFromServerByID={getPostFromServerByID}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails
              getComments={getCommentsFromServer}
            />
          </div>
        )}

        {isPostLoading && (
          <div className="App__content">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
