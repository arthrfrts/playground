import React from 'react';

export default class Post extends React.Component {
    render() {
        return (
            <h2>{ this.props.title }</h2>
        )
    }
}