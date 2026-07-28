import { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useAppDispatch } from './app/hooks';
import { setAuthor } from './features/author/authorSlice';
import {
  setPosts,
  setPostsError,
  setPostsLoading,
} from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { getUsers } from './api/users';
import { setUsers } from './features/users/usersSlice';

export const App: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const author = useSelector((state: RootState) => state.author);
  const selectedPost = useSelector((state: RootState) => state.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers().then(users => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (!author) {
      dispatch(setPosts([]));

      return;
    }

    dispatch(setPostsLoading());

    getUserPosts(author.id)
      .then(userPosts => dispatch(setPosts(userPosts)))
      .catch(() => dispatch(setPostsError()));
  }, [author, dispatch]);

  const { items, loaded, hasError } = posts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList
                    posts={posts.items}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
                  />
                )}
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
