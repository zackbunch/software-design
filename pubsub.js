
var events = {
  events: {},
  // takes an event name and the corresponding function to execute as its parameters
  // this function is pushed onto the list of handlers to execute when the event is triggered
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  // the off function also takes an event name and a function as a pararmeter
  // this remove function from the list of handlers to execute when a particular
  // event is triggered
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  trigger: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};
