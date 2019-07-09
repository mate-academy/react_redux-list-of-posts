import React from 'react';
import PostHandler from './PostHandler';

function PostList(props) {
  const list = [];
  if (props.requested) {
    if (props.items) {
      const filtered = props.items.filter(item => item.title.includes(props.inputValue) || item.body.includes(props.inputValue));
      filtered.forEach((element) => {
        list.push(<PostHandler key={element.id} element={element} />);
      });

      return (
        <section>
          <input
            type="text"
            placeholder="search..."
            value={props.inputValue}
            onChange={event => props.updateInput(event.target.value)}
          />
          {list}
        </section>
      );
    }
    return <p>Loading...</p>;
  }
  return <button type="button" onClick={props.getData}>Load</button>;
}

export default PostList;
