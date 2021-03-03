import React from 'react';

import Comment from './Comment';

export default class Post extends React.Component {
    render() {
        return (
            <article>
                <h2>{ this.props.title }</h2>
                <Comment text="Comentário do post" />
            </article>
        );
    }
}