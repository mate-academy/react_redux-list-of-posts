import React from 'react'

export const User = ({ name, email, address }: User) => {
  return (
    <div className="post__user user">
    <p className="user__name">
      {name}
    </p>
    <a href={`mailto:${email}`} className="user__email">
      {email}
    </a>
    <address className="user__address">
      <span>
        {`${address.city}, ${address.street}, ${address.suite}`}
      </span>
    </address>
  </div>
  )
}
