---
title: "Why in JS typeof array and null are object?"
slug: "js/why-js-typeof-array-null-object"
pubDate: "2023-05-10"
description: "Why in JS typeof array and null are object?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

First at all, let's recap

## Data types in JavaScript

| Type      | `typeof` return value |
|-----------|---------------------|
| Null      | "object"            |
| Undefined | "undefined"         |
| Boolean   | "boolean"           |
| Number    | "number"            |
| BigInt    | "BigInt"            |
| String    | "string"            |
| Symbol    | "symbol"            |
| Object    | "object"            |

_The information in this table may vary depending on the author_

Based on this table, several questions already arise if you are a beginner in JavaScript, 
- Why `typeof null` returns `object`? 
- Why are the arrays not in the list? 
- Why if we do `typeof array` does it return `object`?

## Why `typeof null` returns `object`

As for null values, it is a historical quirk that the typeof operator returns "object" for them. This is because the binary representation of null in JavaScript is all zeros, which is the same as the binary representation of an empty object. As a result, when the typeof operator is applied to a null value, it mistakenly returns "object".

And a better explanation of this, was written by <a class="hover:no-underline text-blue underline" href="https://2ality.com/2013/10/typeof-null.html" target="_blank" rel="noopener noreferrer">**Dr. Axel Rauschmayer**</a>:

> The “typeof null” bug is a remnant from the first version of JavaScript. In this version, values were stored in 32 bit units, which consisted of a small type tag (1–3 bits) and the actual data of the value. The type tags were stored in the lower bits of the units. There were five of them:
> - 000: object. The data is a reference to an object.
> - 1: int. The data is a 31 bit signed integer.
> - 010: double. The data is a reference to a double floating point number.
> - 100: string. The data is a reference to a string.
> - 110: boolean. The data is a boolean.

> That is, the lowest bit was either one, then the type tag was only one bit long. Or it was zero, then the type tag was three bits in length, providing two additional bits, for four types.

To check if a value is null, you can use a strict equality comparison (===) with the null value, like this:

```js
const myValue = null;

console.log(typeof myValue); // "object"
console.log(myValue === null); // "true"
```

## Why are the arrays not in the list? and Why if we do `typeof array` does it return `object`?

When applied the typeof operator to an array returns the string `"object"`. This can be confusing because arrays are a separate data type from objects in JavaScript.

The reason for this is historical. In the early versions of JavaScript, arrays were implemented as objects with numeric keys, which were used to index the array elements. Even though arrays have since been given their own data type in the language specification, the typeof operator still returns `"object"` for arrays because they are still implemented as objects in the language.

Arrays are a subtype of objects, meaning they are special objects that have some additional features that differentiate them from generic objects. In fact, arrays in JavaScript are objects that have properties and methods that allow you to manipulate their elements in various ways.

To check if a variable is an array, you can use the `Array.isArray()` method, which returns `true` if the given variable is an array, and `false` otherwise. For example:

```js
const myArray = [3, 6, 9];

console.log(typeof myArray); // "object"
console.log(Array.isArray(myArray)); // "true"
```
