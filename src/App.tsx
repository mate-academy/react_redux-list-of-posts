import { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { loadUsers } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadPosts, removePosts } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.value);
  const { loaded, hasError } = useAppSelector(state => state.posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const dispatch = useAppDispatch();

  const showLoader = !loaded;
  const showError = loaded && hasError;
  const showPosts = loaded && !hasError;

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    setSelectedPost(null);

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
                  || (showPosts && (
                    <PostsList
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
                    />
                  ))}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
