import React from 'react';

import Post from './Post'

export default class App extends React.Component {
    render() {
        return (
            <main>
                <h1>Hello world!</h1>
                <Post title="Título de post 1" />
                <Post title="Título de post 2" />
                <Post title="Título de post 3" />
            </main>
        );
    }
}