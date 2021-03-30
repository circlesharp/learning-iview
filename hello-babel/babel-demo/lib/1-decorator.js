"use strict";

var _class;

const dec = cla => {
  cla.prototype.age = 12;

  cla.prototype.sayName = function () {
    return this.name;
  };
};

let Person = dec(_class = class Person {
  constructor(name) {
    this.name = name;
  }

}) || _class;

const person = new Person('tom');
console.log(person.name, person.sayName(), person.age);