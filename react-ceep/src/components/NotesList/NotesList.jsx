import React, { Component } from 'react';
import NoteCard from '../NoteCard';
import "./style.css";

class NotesList extends Component {
  constructor() {
    super();

    this.state = {notes: []};
    this._newNotes = this._newNotes.bind(this);
  }
  
  componentDidMount() {
    this.props.notes.subscribe(this._newNotes);
  }

  componentWillUnmount() {
    this.props.notes.unsubscribe(this._newNotes);
  }

  _newNotes(notes) {
    this.setState({...this.state, notes});
  }

  render() {
    return (
      <ul className="notes-list">
        {this.state.notes.map((note, index) => {
          return (
            <li className="note" key={index}>
              <NoteCard
                title={note.title}
                content={note.content}
                tag={note.tag}
                noteIndex={index}
                removeNote={this.props.removeNote} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default NotesList;