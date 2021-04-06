import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './style.css';

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.title = '';
    this.content = '';
    this.tag = 'Sem categoria';

    this.state = {tags: []};

    this._newTags = this._newTags.bind(this);
  }

  componentDidMount() {
    this.props.tags.subscribe(this._newTags);
  }

  componentWillUnmount() {
    this.props.tags.unsubscribe(this._newTags);
  }

  _newTags(tags) {
    this.setState({...this.state, tags});
  }

  _handleTitleChange(e) {
    this.title = e.target.value;
  }

  _handleContentChange(e) {
    this.content = e.target.value;
  }

  _handleTagChange(e) {
    e.stopPropagation();
    this.tag = e.target.value;
  }

  _createNote(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.addNote(this.title, this.content, this.tag);
  }s
  
  render() {
    return (
      <form className="add-note-form"
        onSubmit={this._createNote.bind(this)}>
        <select
          onChange={this._handleTagChange.bind(this)}
        >
          <option>Sem categoria</option>
          {this.state.tags.map((tag, index) => {
            return <option key={index}>{tag}</option>
          })}
        </select>
        <input
          type="text" 
          placeholder="Título"
          onChange={this._handleTitleChange.bind(this)} />
        <textarea 
          placeholder="Escreva sua nota"
          onChange={this._handleContentChange.bind(this)} />
        <button type="submit">Criar nota</button>
      </form>
    );
  }
}

export default AddForm;