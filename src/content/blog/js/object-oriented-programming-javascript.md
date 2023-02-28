---
title: "Object-Oriented Programming in Javascript"
slug: "js/object-oriented-programming-javascript"
pubDate: "2020-06-24"
description: "Is JavaScript really an object-oriented programming language?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

The first and very important question, is JavaScript really an object-oriented programming (OOP) language? In my personal opinion, I will say: NO at all; JavaScript, emulates object classes via constructor functions.

But first, what is Object-Oriented Programming?

A programming **paradigm** centered around **objects** rathen than functions.

Mosh is one of the best tutors I have ever met, and I don't want to copy a ton of text, and I personally don't want to explain and transcribe a lot of content that can be better understood through a video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PFmuCDHHpwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Also, this is a very interesting resource in Medium:
<a class="hover:no-underline text-blue underline" href="https://medium.com/better-programming/object-oriented-programming-in-javascript-b3bda28d3e81" target="_blank" rel="noopener noreferrer">A Guide to Object-Oriented Programming in JavaScript</a> and of course this from Eric Ellioot <a class="hover:no-underline text-blue underline" href="https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9" target="_blank" rel="noopener noreferrer">Master the JavaScript Interview: What’s the Difference Between Class & Prototypal Inheritance?</a>.

I made an easy example:

```js
class Person  {
  constructor(firstName, age) {
    this.firstName = firstName;
    this.age = age;
  }

  static getAge(person) {
    return person.age;
  }

  greeting() {
    return `Hello ${this.firstName}`;
  }
}

class Teacher extends Person {
  constructor(firstName, age, id, seniority) {
    super(firstName, age);
    this.id = id;
    this.seniority = seniority;
  }

  set teacherId(newId) {
    this.id = newId;
  }

  get teacherId() {
    return this.id;
  }
}
```

And now, the most important part, how can I check if this works?

```js
const newPerson = new Person('Andres', 35);
Person.getAge(newPerson); // 35
newPerson.greeting(); // "Hello Andres"

const newTeacher = new Teacher('SrHart', 53, 13579, 'Senior');
newTeacher.teacherId = 24680;
newTeacher.teacherId; // 24680
newTeacher.greeting(); // "Hello SrHart"
```