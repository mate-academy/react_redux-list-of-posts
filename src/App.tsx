import { FC, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { Post } from './types/Post';
import { fetchUsers } from './features/users/usersAPI';
import { getUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/post/postAPI';
import { getPosts, getLoaded, getError } from './features/post/postSlice';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(currenAuthor => currenAuthor);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchUsers().then(usersFromServer => dispatch(getUsers(usersFromServer)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoaded(true));

    if (!author) {
      return;
    }

    fetchPosts(author.id)
      .then(post => dispatch(getPosts(post)))
      .catch(() => getError(true))
      .finally(() => dispatch(getLoaded(false)));
  }, [author, dispatch]);

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
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
