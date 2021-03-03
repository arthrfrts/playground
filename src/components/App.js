import React from 'react';

import Post from './Post'

export default class App extends React.Component {
    render() {
        return (
            <main>
                <h1>Hello world!</h1>
                <Post />
            </main>
        )
    }
}