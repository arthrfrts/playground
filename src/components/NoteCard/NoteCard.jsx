import React, { Component } from 'react';
import './style.css';
import {ReactComponent as DeleteSVG} from "../../assets/img/delete.svg";

 class Note extends Component {
  remove() {
    const index = this.props.noteIndex;

    this.props.removeNote(index);
  }

  render() {
    return (
      <section className="card">
        <header className="card_header">
          <h3 className="card_title">{this.props.title}</h3>
          <p>{this.props.tag}</p>

          <button type="button" onClick={this.remove.bind(this)}>
            <DeleteSVG />
          </button>
        </header>
        <p className="card_content">{this.props.content}</p>
      </section>
    );
  }
}

export default Note;