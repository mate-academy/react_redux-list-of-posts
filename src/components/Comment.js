import React from 'react';

export function Comment(props) {
  const {body, name } = props;

  return (
    <section>
      <p>{body}</p>
      <span>{name}</span>
    </section>
  );
}
