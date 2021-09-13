import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSelectedPostId } from '../../store';
import { setPostId } from '../../store/postsReducer';

import { setPostComments } from '../../store/commentsReducer';

type Props = {
  id: number,
  title: string,
  body: string,
};

export const PostItem: React.FC<Props> = React.memo(({ id, title, body }) => {
  const selectedPostId: number = useSelector(getSelectedPostId);

  const dispatch = useDispatch();

  return (
    <>
      <div className="PostsList__item-content">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>

      {selectedPostId !== id ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => {
            dispatch(setPostId(id));
          }}
        >
          Open
        </button>
      ) : (
        <button
          type="button"
          className="PostsList__button button button--active"
          onClick={() => {
            dispatch(setPostId(0));
            dispatch(setPostComments(null));
          }}
        >
          Close
        </button>
      )}
    </>
  );
});
