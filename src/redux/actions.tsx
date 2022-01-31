import {
  LOAD_POSTS,
  LOAD_USERS,
  LOAD_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from './types';
import { Comment } from '../Types/Comment';

const getPosts = (id?: number) => {
  if (id) {
    return fetch(`https://mate.academy/students-api/posts?userId=${id}`);
  }

  return fetch('https://mate.academy/students-api/posts');
};

export function postsLoad(id?: number): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await getPosts(id);
    const jsonData = await response.json();

    dispatch({
      type: LOAD_POSTS,
      data: jsonData,
    });
  };
}

export function usersLoad(): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch('https://mate.academy/students-api/users');
    const jsonData = await response.json();

    dispatch({
      type: LOAD_USERS,
      data: jsonData,
    });
  };
}

export function commentsLoad(): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch('https://mate.academy/students-api/comments');
    const jsonData = await response.json();

    dispatch({
      type: LOAD_COMMENTS,
      data: jsonData,
    });
  };
}

export function commentCreate(newComment: Comment): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch('https://mate.academy/students-api/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newComment),
    });
    const jsonData = await response.json();

    dispatch({
      type: CREATE_COMMENT,
      data: jsonData,
    });
  };
}

export function commentDelete(id: number): (dispatch: any) => Promise<void> {
  return async dispatch => {
    await fetch(`https://mate.academy/students-api/comments/${id}`,
      { method: 'DELETE' });

    dispatch({
      type: DELETE_COMMENT,
      data: id,
    });
  };
}

export function commentUpdate(
  updatedComment: Comment,
  id: number,
): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch(`https://mate.academy/students-api/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(updatedComment),
    });
    const jsonData = await response.json();

    dispatch({
      type: UPDATE_COMMENT,
      data: jsonData,
    });
  };
}
