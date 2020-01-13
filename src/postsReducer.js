// export const DELETE_POST = 'DELETE_POST';
// export const DELETE_COMMENT = 'DELETE_COMMENT';
// export const SET_POST = 'SET_POST';

// export const setPost = posts => ({
//   type: SET_POST, posts,
// });
// export const deletePost = id => ({
//   type: DELETE_POST, id,
// });
// export const deleteComment = id => ({
//   type: DELETE_COMMENT, id,
// });

// const postsReducer = (state, action) => {
//   switch (action.type) {
//     case SET_POST:
//       return {
//         ...state,
//         postsWithUsers: action.posts,
//       };

//     case DELETE_POST:
//       return {
//         ...state,
//         postsWithUsers: state.postsWithUsers
//           .filter(post => post.id !== action.id),
//       };

//     case DELETE_COMMENT:
//       return {
//         ...state,
//         postsWithUsers: state.postsWithUsers.map(post => ({
//           ...post,
//           comments: post.comments
//            .filter(comment => comment.id !== action.id),
//         })),
//       };
//     default:
//       return posts;
//   }
// };

// export default postsReducer;
