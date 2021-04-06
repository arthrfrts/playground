import React from 'react';

export default class Component extends React.Component {
    render() {
        return (
            <p>{ this.props.text }</p>
        );
    }
}