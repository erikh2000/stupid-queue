// This code and some in index.js based on Leon Hassan's nice article on how to do long-polling in Node.js.
// Thanks, Leon!
class EventEmitter {

  listeners = {};

  fire(event) {
      for (const k in this.listeners) {
          let listener = this.listeners[k];
          listener(event);
      }
  }

  register(id, listener) {
      this.listeners[id] = listener;
  }
  
  unregister(id) {
      return delete this.listeners[id];
  }
}

module.exports = EventEmitter;