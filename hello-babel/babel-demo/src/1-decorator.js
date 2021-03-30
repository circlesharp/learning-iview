const dec = cla => {
  cla.prototype.age = 12;
  cla.prototype.sayName = function() {
    return this.name;
  };
}

@dec
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = new Person('tom');

console.log(
  person.name,
  person.sayName(),
  person.age,
);
