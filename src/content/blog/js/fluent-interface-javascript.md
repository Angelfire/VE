---
title: "Fluent Interfaces in JavaScript"
slug: "js/fluent-interface-javascript"
pubDate: "2020-10-17"
description: "Fluent Interface in JavaScript, what it is, and how it works"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

A couple of days ago, I had a technical interview and one of the exercises was OOP and **Fluent Interface**, I had seen its use a couple of times, but I had never had to develop anything similar.

## Fluent Interface
The Fluent Interface is often referred to as *Method Chaining*, *Fluent API* or *jQuery Style*. A fluent interface is an object-oriented API whose design relies extensively on method chaining. Its goal is to increase code legibility by creating a domain-specific language (DSL). The term was coined in 2005 by Eric Evans and Martin Fowler <sup>[1]</sup>.

If you ever worked with jQuery, you had to see code like:

```js
$("img") 
  .attr("src", "https://velocidadescape.com/imagedontexist.jpg")
  .attr("alt", "pic of velocity")
  .attr("width", "99")
  .appentTo("body");
```

## this keyword
Basically `this` refers to the instance of our object that is created. Is the key to creating your own Fluent Interface, is to use the instance object of your JavaScript class.

## Calculator  API

```js
class Calculator {
  constructor(number) {
    this.number = number;
  }

  sum(n) {
    this.number += n;
    return this;
  }

  subtraction(n) {
    this.number -= n;
    return this;
  }

  multiplication(n) {
    this.number *= n;
    return this;
  }

  division(n) {
    this.number /= n;
    return this;
  }

  equal() {
    console.log(this.number);
  }
}
```

This is a very simple example of use:

```js
const operation = new Calculator(3)
  .sum(5)
  .equal();

// => 8
```

```js
const operation = new Calculator(2)
  .sum(4)
  .subtraction(6)
  .multiplication(8)
  .division(10)
  .equal()

// => -1.5
```

I don't know for sure how popular this pattern could be, but at least I found it quite interesting.

[1] <a class="hover:no-underline text-blue underline" href="https://www.martinfowler.com/bliki/FluentInterface.html" target="_blank" rel="noopener noreferrer">FluenInterface</a>

<a class="hover:no-underline text-blue underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" target="_blank" rel="noopener noreferrer">this in JavaScript</a>
