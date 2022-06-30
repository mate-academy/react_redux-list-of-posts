import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequest, request } from '../../api/api';
import {
  setCommentListAction,
  setNeedToUpdate,
  setSingleSelectedPost,
} from '../../store/actions';
import {
  getCommentsSelector,
  getNeedToUpdate,
  getPostIdSelector,
  getSinglePostSelector,
} from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import './PostDetails.scss';

export const PostDetails : React.FC = () => {
  const dispatch = useDispatch();
  const commentsList = useSelector(getCommentsSelector);
  const postId = useSelector(getPostIdSelector);
  const currPost = useSelector(getSinglePostSelector);
  const needToUpdate = useSelector(getNeedToUpdate);

  const [isVisibleComments, setCommentsVisibility] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      if (postId !== null) {
        const commentList = await request(`comments?postId=${postId}`);
        const selectedPost = await request(`posts/${postId}`);

        dispatch(setCommentListAction(commentList));
        dispatch(setSingleSelectedPost(selectedPost));
      }
    };

    fetcher();
  }, [postId, needToUpdate]);

  return (
    <div className="PostDetails">
      <h2>Post Details</h2>
      {currPost !== null && (
        <>
          <section className="PostDetails__post">
            <p>{currPost.title}</p>
          </section>
          <button
            type="button"
            className="button"
            onClick={() => {
              setCommentsVisibility(!isVisibleComments);
            }}
          >
            Hide comments
          </button>

        </>
      )}
      {isVisibleComments && (
        <ul className="PostDetails__list">
          {commentsList.map(singleComment => (
            <li key={singleComment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={async () => {
                  await deleteRequest(`comments/${singleComment.id}`);
                  dispatch(setNeedToUpdate(!needToUpdate));
                }}
              >
                X
              </button>
              <p>{singleComment.body}</p>
            </li>
          ))}
        </ul>
      )}
      <NewCommentForm />
    </div>
  );
};
