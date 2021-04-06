import React, { Component } from 'react';
import './style.css';

class TagsList extends Component {
  constructor() {
    super();

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
  
  _handleInputEvent(e) {
    const tagName = e.target.value;
    
    if (e.keyCode === 13) {
      this.props.createTag(tagName);
    }
  }

  render() {
    return (
      <nav>
        <ul>
          {this.state.tags.map((tag, index) => {
            return <li key={index}>{tag}</li>
          })}
        </ul>

        <input
          type="text"
          placeholder="Adicionar categoria"
          onKeyUp={this._handleInputEvent.bind(this)}
        />
      </nav>
    );
  }
}

export default TagsList