import React from 'react';

export function User(props) {
    const { name, email } = props.user;

    return (
        <section>
            <h2>{name}</h2>
            <h5>{email}</h5>
        </section>
    );
}
