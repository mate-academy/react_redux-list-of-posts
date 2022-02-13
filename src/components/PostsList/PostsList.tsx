import './PostsList.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostIdAction, loadPostsAction } from '../../store/actions';
import { getPostIdSelector, getUserIdSelector, getPostsSelector } from '../../store/selectors';
import { getPosts } from '../../helpers/posts';
import { PostsListUi } from './PostListUi';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const selectedUserId = useSelector(getUserIdSelector);
  const selectedPostId = useSelector(getPostIdSelector);
  const [initialize, setInitialize] = useState(false);

  const setSelectePostId = (postId : number) => {
    if (selectedPostId === postId) {
      dispatch(loadPostIdAction(0));
    } else {
      dispatch(loadPostIdAction(postId));
    }
  };

  const loadData = async () => {
    const postsFromServer = await getPosts(selectedUserId);

    dispatch(loadPostsAction(postsFromServer));
    setInitialize(true);
  };

  useEffect(() => {
    setInitialize(false);
    loadData();
  }, [selectedUserId]);

  return (
    <>
      <PostsListUi
        posts={posts}
        initialize={initialize}
        selectedPostId={selectedPostId}
        setSelectePostId={setSelectePostId}
      />
    </>
  );
};
