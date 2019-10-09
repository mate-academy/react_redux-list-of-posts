import { connect } from 'react-redux';
import { removeComment } from '../../store/index';
import Commentitem from './Commentitem';

const mapMethodsToProps = dispatch => ({
  removeComment: id => dispatch(removeComment(id)),
});

const ConnectedComment = connect(null, mapMethodsToProps)(Commentitem);

export default ConnectedComment;
