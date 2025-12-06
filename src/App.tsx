import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadUsers } from './slices/users';
import * as postsActions from './slices/posts';
import { setSelectedPost } from './slices/selectedPost';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.user);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const selectedPost = useAppSelector(state => state.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then(pagePosts => dispatch(postsActions.setPosts(pagePosts)))
      .catch(() => dispatch(postsActions.setError(true)))
      .finally(() => dispatch(postsActions.setLoaded(true)));
  }

  useEffect(() => {
    dispatch(loadUsers());
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
                {/* <UserSelector value={author} onChange={setAuthor} /> */}
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList />
                  // <PostsList
                  //   posts={posts}
                  //   selectedPostId={selectedPost?.id}
                  //   onPostSelected={setSelectedPost}
                  // />
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
              {selectedPost && <PostDetails />}
              {/* post={selectedPost} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
