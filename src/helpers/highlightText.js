import React, { Fragment } from 'react';

export const highlightText = (text, highlightedText) => {
  if (!highlightedText || !text) {
    return text;
  }

  const parts = text.toString().split(new RegExp(`(${highlightedText})`, 'gi'));

  return parts.map((part, i) => (
    <Fragment key={`${part + i}`}>
      {part.toLowerCase() === highlightedText.toLowerCase()
        ? <span style={{ backgroundColor: '#f4fc03' }}>{part}</span>
        : part}
    </Fragment>
  ));
};
