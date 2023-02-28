---
title: "Destructuring: From Zero to Hero"
slug: "js/destructuring-zero-hero"
pubDate: "2021-05-01"
description: "Destructuring assignment is probably one of the most importante features that came with ES6. Basically allow us unpack values from arrays, or properties from objects, into distinct variables."
author: "Andres Bedoya"
tags: ["JavaScript"]
---

**Destructuring assignment** is probably one of the most importante features that came with ES6. Basically allow us unpack values from arrays, or properties from objects, into distinct variables.

In older versions of ECMAScript this was a bit cumbersome:

"Destructuring" arrays:

```js
var myArr = ["Andres", "Bedoya"]

// ES5 and previous
var firstName = myArr[0]
var lastName = myArr[1]

// ES6
const [firstName, lastName] = myArr
```

"Destructuring" objects:

```js
var myObject = { firstName: "Andres", lastName: "Bedoya" }

// ES5 and previous
var firstName = myObject["firsName"]
var lastName = myObject["lastName"]

// ES6
const { firstName, lastName } = myObject
```

## Skip values

But syntax is not the only power that Destructuring has, you can skip over items in the array being destructured:

```js
const letters = ["a", "b", "m", "d", "e"]

const [, , em] = letters

// console.log(em) => 'm'
```

## Using rest pattern

And you can capture all trailing items in an array with a “rest” pattern:

```js
const letters = ["a", "b", "m", "d", "e"]

const [head, ...tail] = letters

// console.log(head) => 'a'
// console.log(tail) => ['b', 'm', 'd', 'e']
```

## Default values

And you can have default values, these values only work if the variables either don't exist or their value is set to `undefined`. Any other value, including `null`, `false` and `0`, bypasses the default values in the destructuring statement.

```js
const user = {
  firstName: "Andres",
  age: 36,
}

const { firstName, lastName = "Doe", age = 100 } = user

// console.log(`My name is ${firstName} ${lastName} and I'm ${age} years old`) =>
// My name is Andres Doe and I'm 36 years old
```

## Rename variables

And even you can rename variables in the destructuring assignment:

```js
const user = {
  firstName: "Andres",
  age: 36,
}

const { firstName: author, age } = user

// console.log(`My name is ${author} and I'm ${age} years old`) =>
// My name is Andres and I'm 36 years old
```

## Multiple return values

```js
function returnMultipleValues() {
  return {
    foo: 1,
    bar: 2,
  }
}

const { foo, bar } = returnMultipleValues()

// console.log(foo, bar) => 1 2
```

## Function parameter definition

Imagine the following scenario: You need to fetch the data from the following endpoint: `"http://swapi.dev/api/people/1/"`, the full result is:

```js
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "http://swapi.dev/api/planets/1/",
  "films": [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/6/"
  ],
  "species": [],
  "vehicles": [
      "http://swapi.dev/api/vehicles/14/",
      "http://swapi.dev/api/vehicles/30/"
  ],
  "starships": [
      "http://swapi.dev/api/starships/12/",
      "http://swapi.dev/api/starships/22/"
  ],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "http://swapi.dev/api/people/1/"
}
```

But you only need the `name` and `gender`:

```js
fetch("https://swapi.dev/api/people/1/")
  .then(data => data.json())
  .then(renderData)
  .catch(error => {
    console.error(error)
  })

function renderData({ name, gender }) {
  console.log(name, gender)
}

// console.log(name, gender) => Luke Skywalker male
```

You can pass the full `data` object as an argument, but your function can destructure only the values you need...

## Ridiculous example

This is real power combined:

```js
const myObj = {
  myInfo: { a: { b: ["Andres", "Bedoya"] } },
  mySkills: [1, 2, { frontend: ["Javascript"] }, { backend: ["Python"] }],
}

const {
  myInfo: {
    a: {
      b: [, lastName],
    },
  },
  mySkills: [
    ,
    ,
    {
      frontend: [frontStack],
    },
    {
      backend: [backStack],
    },
  ],
} = myObj

// console.log(`My friends call me ${lastName} and I have more than 9 years using ${frontStack} and 3 years using ${backStack}`) =>
// My friends call me Bedoya and I have more than 9 years using Javascript and 3 years using Python
```

If you think I missed an important feature, please let me know!

Happy coding!
