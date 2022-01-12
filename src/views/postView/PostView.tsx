import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { PostsList } from '../../components/PostsList/PostsList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PostsActionsCreator } from '../../store/posts';

export const PostView = () => {
  const { posts, loadingPosts, errorPosts } = useTypedSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PostsActionsCreator.fetchPosts());
  }, []);

  if (errorPosts) {
    return <h3>{errorPosts}</h3>;
  }

  if (loadingPosts) {
    return <Loader />;
  }

  return <PostsList posts={posts} />;
};
