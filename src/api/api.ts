import axios from 'axios';
import { RootStateOrAny } from 'react-redux';
import { fetchCommentsAction } from '../store/commentsReducer';
import { fetchPostsAction } from '../store/postsReducer';
import { fetchUsersAction } from '../store/usersReducer';

export const fetchPosts = () => {
  return (dispatch: RootStateOrAny) => {
    axios.get('https://mate.academy/students-api/posts')
      .then(res => dispatch(fetchPostsAction(res.data)));
  };
};

export const fetchUsers = () => {
  return (dispatch: RootStateOrAny) => {
    axios.get('https://mate.academy/students-api/users')
      .then(res => dispatch(fetchUsersAction(res.data)));
  };
};

export const fetchComments = (postId: number) => {
  return (dispatch: RootStateOrAny) => {
    axios.get(`https://mate.academy/students-api/comments?postId=${postId}`)
      .then(res => dispatch(fetchCommentsAction(res.data)));
  };
};

export const addComment = (postId: number, name: string, body: string) => {
  axios.post('https://mate.academy/students-api/comments', {
    postId,
    name,
    body,
    email: 'email@email.com',
  });
};

export const deleteComment = (commentId: string) => {
  axios.delete(`https://mate.academy/students-api/comments/${commentId}`);
};
