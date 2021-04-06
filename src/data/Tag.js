class Tag {
  constructor() {
    this.items = [];

    this._observers = [];
  }

  add(newTag) {
    this.items.push(newTag);
    this.notify();
  }

  subscribe(func) {
    this._observers.push(func);
  }

  unsubscribe(func) {
    console.log(this._observers.length);
    this._observers = this._observers.filter(f => f !== func);
    console.log(this._observers.length);
  }

  notify() {
    this._observers.forEach(func => {
      func(this.items);
    });
  }
}

export default Tag;;