---
title: "Built-in error objects in JavaScript"
slug: "js/errors-javascript"
pubDate: "2023-03-02"
description: "Built-in error objects in JavaScript and how to use them"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

This morning I was improving a bit my blog, and I found this piece of code, this is simply a validation that I am doing on a component that I create for Astro:

```js
if (typeof text !== "string") {
  throw new Error("text must be a string")
}

if (typeof maxLength !== "number") {
  throw new Error("maxLength must be a number")
}

if (typeof addEllipsis !== "boolean") {
  throw new Error("addEllipsis must be a boolean")
}
```

`throw new Error` is not incorrect, but it is generic, the `TypeError` object is more specific and is commonly used for errors that occur when a value is not of the expected type.

So as a personal note I'm going to post all the built-in error objects that JavaScript has so I know when to use them.

## Error

This is the generic error object in JavaScript. It is used to represent any type of error that is not covered by the other error objects. This object includes a "message" property that specifies an error message.
`js
    throw new Error("This is a generic error")
    `

## SyntaxError

This is used when there is a syntax error in the JavaScript code. This object includes a "message" property that specifies an error message.
`js
    throw new SyntaxError("This is a syntax error")
    `

## TypeError

This is used when a type error occurs, such as attempting to call a function on an object that is not a function. This object includes a "message" property that specifies an error message.
`js
    throw new TypeError("This is a type error")
    `

## RangeError

This is used when a range error occurs, such as attempting to create an array with a negative number of elements. This object includes a "message" property that specifies an error message.
`js
    throw new RangeError("This is a range error")
    `

## ReferenceError

This is used when attempting to access a variable that is not defined. This object includes a "message" property that specifies an error message.
`js
    throw new ReferenceError("This variable is not defined")
    `

## URIError

This is used when an error occurs in a URI, such as attempting to decode an invalid URI. This object includes a "message" property that specifies an error message.
`js
    throw new URIError("This is an invalid URI")
    `

You can find more informacion in <a class="hover:no-underline text-blue underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank" rel="noreferrer">MDN Error</a>.

And did you know that you could create even your own errors? :)

```js
class TriangleError extends Error {
  constructor(message) {
    super(message)
    this.name = "TriangleError"
  }
}
```

Then:

```js
function calculateTriangleArea(base, height) {
  if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
    throw new TriangleError("The arguments must be positive numbers.")
  }

  return (base * height) / 2
}

try {
  const area = calculateTriangleArea(5, "10")
} catch (error) {
  if (error instanceof TriangleError) {
    console.error(`Error: ${error.message}`)
  } else {
    console.error(error)
  }
}
```

Regards...
