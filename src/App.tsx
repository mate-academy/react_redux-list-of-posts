import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { client } from './utils/fetchClient';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useMemo, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { PostComment } from './types/Comment';
import { DataState } from './types/DataState';

export const App = () => {
  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<DataState<Post>>({
    loaded: false,
    hasError: false,
    items: [],
  });
  // const [postsLoading, setPostsLoading] = useState(false);
  // const [postsError, setPostsError] = useState(false);
  // const [error, setError] = useState(false);
  const [usersError, setUsersError] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const selectedPost = useMemo(
    () => posts.items.find(p => p.id === selectedPostId) || null,
    [posts, selectedPostId],
  );

  const [comments, setComments] = useState<DataState<PostComment>>({
    loaded: false,
    hasError: false,
    items: [],
    visible: false,
  });

  const author = useMemo(
    () => users.find(u => u.id === selectedUserId) || null,
    [users, selectedUserId],
  );
  // const usersFetched = useRef(false);
  // const [commentsLoading, setCommentsLoading] = useState(false);
  // const [commentsError, setCommentsError] = useState(false);

  const handleDeleteComment = (id: number) => {
    setComments(prev => ({
      ...prev,
      items: prev.items.filter(comment => comment.id !== id),
    }));
  };

  useEffect(() => {
    if (!author) {
      setPosts({ loaded: true, hasError: false, items: [] });
      setSelectedPostId(null);

      return;
    }

    setPosts(prev => ({ ...prev, loaded: false, hasError: false }));
    client
      .get<Post[]>(`/posts?userId=${author.id}`)
      .then(items => setPosts({ loaded: true, hasError: false, items }))
      .catch(() => setPosts({ loaded: true, hasError: true, items: [] }));
  }, [author]);

  useEffect(() => {
    if (!selectedPost) {
      setComments({ loaded: true, hasError: false, items: [], visible: false });

      return;
    }

    setComments(prev => ({
      ...prev,
      loaded: false,
      hasError: false,
      visible: true,
    }));

    client
      .get<PostComment[]>(`/comments?postId=${selectedPost.id}`)
      .then(items =>
        setComments({ loaded: true, hasError: false, items, visible: true }),
      )
      .catch(() =>
        setComments({ loaded: true, hasError: true, items: [], visible: true }),
      );
  }, [selectedPost]);

  useEffect(() => {
    let cancelled = false;

    client
      .get<User[]>('/users')
      .then(fetchedUsers => {
        if (!cancelled) {
          setUsers(fetchedUsers);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUsersError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // useEffect(() => {
  //   if (!selectedUserId) {
  //     setPosts([]);
  //     setSelectedPostId(null);

  //     return;
  //   }

  //   setPostsLoading(true);
  //   setPostsError(false);
  //   setSelectedPostId(null);

  //   client
  //     .get<Post[]>('/posts?userId=${selectedUserId}')
  //     .then(setPosts)
  //     .catch(() => setPostsError(true))
  //     .finally(() => setPostsLoading(false));
  // }, [selectedUserId]);

  // useEffect(() => {
  //   if (!selectedPostId) {
  //     setComments([]);
  //     setCommentsLoading(false);
  //     setCommentsError(false);

  //     return;
  //   }

  //   setCommentsLoading(true);
  //   setCommentsError(false);

  //   client
  //     .get<CommentType[]>('/comments?postId=${selectedPostId}')
  //     .then(setComments)
  //     .catch(() => setCommentsError(true))
  //     .finally(() => setCommentsLoading(false));
  // }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {!posts.loaded && author && <Loader />}

                {usersError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  (posts.items.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts.items}
                      selectedPostId={selectedPost?.id ?? null}
                      onSelectPost={setSelectedPostId}
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
              { 'Sidebar--open': comments.visible },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments.items}
                commentsLoading={!comments.loaded}
                commentsError={comments.hasError}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
