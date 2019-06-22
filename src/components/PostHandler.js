import connect from 'react-redux/es/connect/connect';
import { Posts } from './Posts';

// function mapStateToProps(state) {
//   return {
//     key={item.id}
//     //     userId={item.userId}
//     //     title={item.title}
//     //     body={item.body}
//     //     id={item.id}
//     //     comments={comments}
//     //     usersMap={usersMap}
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
  };
}

export const PostHandler = connect(null, mapDispatchToProps)(Posts);
