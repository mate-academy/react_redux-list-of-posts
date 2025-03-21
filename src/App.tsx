import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState, AppDispatch } from './app/store';
import { fetchPosts } from './features/postsSlice';
import { setAuthor } from './features/authorSlice';
import { setSelectedPost } from './features/selectedPostSlice';
import PostsList from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const author = useSelector((state: RootState) => state.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  const handleAuthorChange = (newAuthor: User | null) => {
    dispatch(setAuthor(newAuthor));
    dispatch(setSelectedPost(null));
  };

  const handlePostSelect = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={handleAuthorChange}
                  users={[]}
                />
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
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id || null}
                    onPostSelected={handlePostSelect}
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
