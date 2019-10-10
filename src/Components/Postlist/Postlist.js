import React from 'react';
import PropTypes from 'prop-types';
import './Postlist.css';
import ConnectedPost from '../Post/ConnectedPost';

const Postlist = ({
  filteredList, isLoaded, sortByTitle, sortByTitleReverse,
}) => (
  <div className="post-list">
    {isLoaded && (
      <>
        <button
          type="button"
          onClick={sortByTitle}
        >
        Sort A-Z
        </button>
        <button
          type="button"
          onClick={sortByTitleReverse}
        >
        Sort Z-A
        </button>
      </>
    )}
    {filteredList
      .map(post => <ConnectedPost id={post.id} post={post} key={post.id} />)}
  </div>
);

Postlist.propTypes = {
  filteredList: PropTypes.arrayOf(PropTypes.object),
  isLoaded: PropTypes.bool,
  sortByTitle: PropTypes.func,
  sortByTitleReverse: PropTypes.func,
}.isRequaired;

export default Postlist;
