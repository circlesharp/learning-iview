"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Person {
  constructor() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'person';

    _defineProperty(this, "greeting", 'Hello');

    _defineProperty(this, "sayName", () => {
      console.log(this.greeting, this.name);
    });

    this.name = name;
  }

}

const realPerson = new Person('real');
const fakePerson = {
  name: 'fake'
};
fakePerson.sayName = realPerson.sayName;
realPerson.sayName();
fakePerson.sayName();