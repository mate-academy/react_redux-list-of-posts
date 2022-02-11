import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
// import { getPostDetails } from '../../api/posts';
// import { getPostComments, deleteComment } from '../../api/comments';

// type Props = {
//   selectedPostId: number;
// };

export const PostDetails: React.FC = () => {
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);
  // const { selectedPostId } = props;
  // const [post, setPost] = useState<Post>();
  // const [comments, setComments] = useState<Comment[]>();
  // const [commentsVisible, setCommentsVisible] = useState(false);

  // const getPostDetailsFromServer = async () => {
  //   const postDetailsFromServer = await getPostDetails(selectedPostId);

  //   setPost(postDetailsFromServer);
  // };

  // const getCommentsFromServer = async () => {
  //   const commentsFromServer = await getPostComments(selectedPostId);

  //   setComments(commentsFromServer);
  // };

  useEffect(() => {
    // getPostDetailsFromServer();
    // getCommentsFromServer();
    console.log(selectedPostId)
  }, [selectedPostId]);

  // const toggleComments = () => {
  //   setCommentsVisible(!commentsVisible);
  // };

  // const getCommentsButton = () => {
  //   if (comments && comments.length > 0) {
  //     return (
  //       <button
  //         type="button"
  //         className="button"
  //         onClick={toggleComments}
  //       >
  //         {!commentsVisible
  //           ? `Show ${comments.length} comments`
  //           : `Hide ${comments.length} comments`}
  //       </button>
  //     );
  //   }

  //   return (
  //     <span>No comments found</span>
  //   );
  // };

  // const deleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   await deleteComment(event.currentTarget.name);
  //   await getCommentsFromServer();
  // };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {/* {selectedPostId !== 0 ? (
        <>
          <section className="PostDetails__post">
            <p>{post && post.title}</p>
          </section>

          <section className="PostDetails__comments">
            {getCommentsButton()}

            <ul className="PostDetails__list">
              {comments && commentsVisible && comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    name={String(comment.id)}
                    onClick={deleteHandler}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm postId={selectedPostId} updateComments={getCommentsFromServer} />
            </div>
          </section>
        </>
      ) : (
        <span>Please select a post to see details</span>
      )} */}
      {selectedPostId !== 0 ? (
        <span>123</span>
      ) : (
        <span>Please select a post to see details</span>
      )}
    </div>
  );
};
