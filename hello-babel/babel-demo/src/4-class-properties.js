class Person {
  greeting = 'Hello';

  constructor(name = 'person') {
    this.name = name;
  };

  sayName = () => {
    console.log(this.greeting, this.name);
  };
}

const realPerson = new Person('real');

const fakePerson = {
  name: 'fake'
}
fakePerson.sayName = realPerson.sayName;

realPerson.sayName();
fakePerson.sayName();
