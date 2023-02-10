import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import classNames from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';

import { loadPosts, removePosts } from './features/postsSlice';
import { closePost } from './features/selectedPostSlice';
import { loadUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.author);
  const { loaded, hasError } = useAppSelector(state => state.posts);
  const { post: selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const showLoader = !loaded;
  const showError = loaded && hasError;
  const showPosts = loaded && !hasError;

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    dispatch(closePost());

    dispatch(author
      ? loadPosts(author.id)
      : removePosts());
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (showLoader && <Loader />)
                  || (showError && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  ))
                  || (showPosts && <PostsList postId={selectedPost?.id} />)}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
