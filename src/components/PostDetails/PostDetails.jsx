import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, getPostDetails, deleteComment, addComment } from '../../helpers/api';
import './PostDetails.scss';
import { Loader } from "../Loader/Loader";


export const PostDetails = ({selectedPostId}) => {
  const [visibilityComments, setVisibilityComments] = useState(false);
  const [detailsForPost, setPostDetails] = useState();
  const [listComments, setListComments] = useState([]);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then((detailsPost) => {
        setPostDetails(detailsPost);
      });

    getPostComments(selectedPostId)
      .then((result) => {
        setListComments(result);
      });
  }, [selectedPostId]);

  const updateCommentsForPost = () => {
    getPostComments(selectedPostId)
      .then((result) => {
        setListComments(result);
      });
  };

  return detailsForPost ? (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{detailsForPost.body}</p>
      </section>
      {listComments && listComments.length > 0 && (

        <section className="PostDetails__comments">
          {visibilityComments ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibilityComments(false);
              }
              }
            >
              Hide
              {listComments.length}
              {' '}
              comments
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibilityComments(true);
              }}
            >
              Show
              {' '}
              {listComments.length}
              {' '}
              comments
            </button>
          )}

          <ul className="PostDetails__list">
            {visibilityComments
            && listComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async() => {
                    await deleteComment(comment.id);
                    getPostComments(selectedPostId)
                      .then((result) => {
                        setListComments(result);
                      });
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
            }
          </ul>
        </section>
      )}
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
            selectedPostId={selectedPostId}
            updateCommentsForPost={updateCommentsForPost}
          />
        </div>
      </section>

    </div>
  ) : <Loader/>;
};

// PostDetails.propTypes = {
//   selectedPostId: PropTypes.string.isRequired,
// };
