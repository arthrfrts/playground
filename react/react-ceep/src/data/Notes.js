class Note {
  constructor(title, content, tag) {
    this.title = title;
    this.content = content;
    this.tag = tag;
  }
}

class Notes {
  constructor() {
    this.items = []

    this._observers = [];
  }

  addNote(title, content, tag) {
    const newNote = new Note(title, content, tag);

    this.items.push(newNote);
    this.notify();
  }

  removeNote(index) {
    this.items.splice(index, 1);
    this.notify();
  }

  subscribe(func) {
    this._observers.push(func);
  }

  unsubscribe(func) {
    this._observers = this._observers.filter(f => f !== func);
  }

  notify() {
    this._observers.forEach(func => {
      func(this.items);
    });
  }
}

export default Notes;