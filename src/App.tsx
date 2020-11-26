import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Start } from './components/Start';
import { PostsList } from './components/PostsList';
import { choosePostId } from './store/postId';
import { setPostIdCheck} from './store/postIdCheck';
import { PostDetails } from './components/PostDetails';
import { chooseUserId } from './store/userId';
import { arrayOfSelectUsers } from './helpers/users';
import { getPosts, fetchDetailsOfPost } from './store';
import { isLoading, getPostId, getpostIdCheck } from './store/selectors';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const posts = useSelector(getPosts);
  const selectedPostId = useSelector(getPostId);
  const postIdCheck = useSelector(getpostIdCheck);

  const handleClick = (postId: number, action: any) => {
    dispatch(fetchDetailsOfPost(postId));

    switch (action) {
      case 'Open':
        dispatch(choosePostId(postId));
        dispatch(setPostIdCheck(true));
        break;
      case 'Close':
        dispatch(choosePostId(0));
        dispatch(setPostIdCheck(false));
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      {!loading
        ? <Start />
        : (
          <div className="App__loadPosts">
            <header className="App__header">
              <label>
                Select a user: &nbsp;
                <select
                  className="App__user-selector"
                  onChange={event => dispatch(chooseUserId(+event.target.value))}
                >
                  {arrayOfSelectUsers.map((user, index) => (
                    <option
                      key={user}
                      value={index}
                    >
                      {user}
                    </option>
                  ))}
                </select>
              </label>
            </header>

            <main className="App__main">
              <div className="App__sidebar">
                <PostsList
                  handleClick={handleClick}
                  postIsOpened={postIdCheck}
                  activePostId={selectedPostId}
                  posts={posts}
                />
              </div>
              <div className="App__content">
                {postIdCheck && (
                  <PostDetails
                    postId={selectedPostId}
                  />
                )}
              </div>
            </main>
          </div>
        )
      }
    </div>
  );
};

export default App;
