---
title: "An introduction to Monads in Javascript"
slug: "js/introduction-monads-javascript"
pubDate: "2023-02-01"
description: "An introduction to Monads in Javascript and exploring the Benefits of Monads for Javascript Developers"
author: "Andres Bedoya"
tags: ["JavaScript", "FP"]
---

This is probably one of the most complex topics that I have talked in this blog...

We can find definitions of Monads in Mathematics (category theory and linear algebra), Philosophy, Biology and Functional Programming. We already know that it will not be something easy to digest.

Let's look at the Wikipedia definition:

> In category theory, a branch of mathematics, a monad (also triple, triad, standard construction and fundamental construction) is a monoid in the category of endofunctors.

Is it clear?

Let's see another approximate definition of what a Monad would be in functional programming.

A monad is like a special helper tool that makes it easier to work with certain types of values in your code.

Imagine you have a box that can only hold one type of toy, let's say it can only hold balls. Every time you want to play with a ball, you have to put it inside the box, play with it, and then take it out. The box makes sure that the ball stays safe while you play with it and it helps you keep track of which ball you have.

That's what a monad does with values in your code. It takes a value, puts it in a "box" so that you can work with it in a safe and organized way, and then takes it out when you're done. Just like with the toy box, this makes it easier for you to keep track of what's going on in your code, and helps you make sure that everything works the way it should.

One of the most famous articles about Monads in JavaScript was written by *Eric Elliott* ~5 years ago, <a class="hover:no-underline text-blue underline" href="https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8" target="_blank" rel="noreferrer">JavaScript Monads Made Simple</a>. But to be completely honest and with all due respect to Eric, there is no way that after reading his article you will say: Wow, that's great, I understood everything, I'm refactoring my code right now... It's absolutely dense.

One of the few parts that was clear to me:

> A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, or I/O.

## Monads in JavaScript
In JavaScript, a monad can be implemented as a function that takes a value and returns an object with a "bind" method, which can be used to chain operations together. The bind method takes a function as an argument, applies it to the original value, and returns the result as a new monad. This allows for a more declarative and expressive style of programming, and can be particularly useful for handling asynchronous operations.

## Maybe, Either, I/O Monads
Let's see what could be the 3 most famous monads:

**Disclaimer**: These are just 3 examples, implementations may vary from developer to developer, depending on the specific use case and context.

### Maybe Monad
```js
const Maybe = value => ({
  bind: f => value == null ? Maybe(null) : f(value),
  map: f => value == null ? Maybe(null) : Maybe(f(value)),
  toString: () => `Maybe(${value})`
})
```

### Either Monad
```js
const Either = (left, right) => ({
  map: f => right ? Either(left, f(right)) : Either(left, right),
  mapLeft: f => Either(f(left), right),
  fold: (f, g) => left ? f(left) : g(right)
})
```

### I/O Monad
```js
const IO = f => ({
  bind: g => IO(() => g(f()).run()),
  map: g => IO(() => g(f())),
  run: () => f(),
  toString: () => `IO(?)`
})
```
_I asked OpenAI to implement this Monad and it took about 60 minutes to do it correctly, all the implementations it gave me were incorrect... Fellow developers, don't trust ChatGPT to copy and paste code... I give you advice..._

## Examples
Monad Either:
```js
const divide = (x, y) => 
  y === 0 ? Either("Cannot divide by 0", null) : Either(null, x / y)

const eitherDivide = (x, y) => divide(x, y).fold(
  error => console.error(error),
  result => console.log(result)
)

eitherDivide(9, 3) // logs: 3
eitherDivide(3, 0) // logs error: Cannot divide by 0
```

Monad I/O:
```js
const getUsername = () =>
  IO(() => prompt("Enter your username:"))

const getPassword = () =>
  IO(() => prompt("Enter your password:"))

const login = () =>
  getUsername()
    .bind(username =>
      getPassword().map(password => ({ username, password })))

const result = login().run()

console.log(result) // logs: {username: 'yourusername', password: 'yourpassword'}
```

And of course, you can find much more complex examples, like this one <a class="hover:no-underline text-blue underline" href="https://blog.logrocket.com/javascript-either-monad-error-handling/" target="_blank" rel="noreferrer">Using the JavaScript Either monad for error handling</a>.

## Benefits
Some of these benefits are described in theory. But after reading and trying to understand, it's really hard (at least for me) trying to apply this in my day to day.

- Simplifies complex and nested logic.
- Improves code readability: Monads enforce a clear structure and abstract away implementation details.
- Increases code reuse.
- Enhances error handling: Monads can be used to handle errors and exceptional situations in a consistent and predictable manner.
- Supports functional programming.
- Supports composability.

It's definitely very dense, but keep studying, functional programming is tremendously interesting...

Sorry if you find some inaccuracies, but as I could understand it is something quite complex to explain...
