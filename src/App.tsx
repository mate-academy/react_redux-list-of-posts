import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';
import { MemoizedCounter } from './features/counter/Counter';
// import { UserSelectorOld } from './components/UserSelectorOld';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getAllUsersAsync,
  selectCurrentUser,
} from './features/users/usersSlice';
// import { PostsListOld } from './components/PostsListOld';
import {
  selectCurrentPost,
  selectPosts,
  selectPostsStatus,
} from './features/posts/postsSLice';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectCurrentPost);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    dispatch(getAllUsersAsync());
  },
  []);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    // setSelectedPost(null);

    // if (author) {
    //   loadUserPosts(author.id);
    // } else {
    //   setPosts([]);
    // }
  },
  [
    // author?.id,
  ]);

  const postsFromStore = useAppSelector(selectPosts);
  const authorFromStore = useAppSelector(selectCurrentUser);
  const statusPostsDownload = useAppSelector(selectPostsStatus);

  // eslint-disable-next-line no-console
  console.log('statusPostsDownload = ', statusPostsDownload);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <MemoizedCounter />

      {/* old container */}
      {/* <div className="container" style={{ border: '3px solid red' }}>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelectorOld
                  value={author}
                  onChange={setAuthor}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

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
                  <PostsListOld
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* new container -----------------------------------------------------*/}
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!authorFromStore && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { authorFromStore && (statusPostsDownload === 'loading')
                  && (
                    <>
                      <p>{`${authorFromStore?.name} loading....`}</p>
                      <Loader />
                    </>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'failed')
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'idle')
                  && postsFromStore.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'idle')
                  && postsFromStore.length > 0
                  && (
                    <PostsList />
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
              {selectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
