import React, { Component } from 'react';
import AddForm from './components/AddForm';
import NotesList from './components/NotesList';
import './assets/App.css';
import TagsList from './components/TagsList';
import Tag from './data/Tag';
import Notes from './data/Notes';

class App extends Component {
  constructor() {
    super();

    this.tags = new Tag();
    this.notes = new Notes();
  }

  render() {
    return (
      <main>
        <AddForm
          tags={this.tags}
          addNote={this.notes.addNote.bind(this.notes)}
        />
        <TagsList
          createTag={this.tags.add.bind(this.tags)}
          tags={this.tags}
        />
        <NotesList
          removeNote={this.notes.removeNote.bind(this.notes)}
          notes={this.notes}
        />
      </main>
    );
  }
}

export default App;
