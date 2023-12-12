---
title: "Standard built-in objects in JavaScript"
slug: "js/standard-built-in-objects-javascript"
pubDate: "2021-05-04"
description: "Standard built-in objects in JavaScript: array, map, object, set and how to use them"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

> The term "global objects" (or standard built-in objects) here is not to be confused with the global object. Here, "global objects" refer to objects in the global scope.

> The global object itself can be accessed using the this operator in the global scope. In fact, the global scope consists of the properties of the global object, including inherited properties, if any. <a class="hover:no-underline text-blue underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#standard_objects_by_category" target="_blank" rel="noreferrer">Standard built-in objects</a>

To begin with, this is confusing enough; my idea is not to confuse many more, it is simply to show you some of the global objects that come in the latest ECMAScript specification and that we see commonly.

The specification divides these global objects by categories as follows (I'm just going to show the most common):

**Fundamental objects**

- `Object`

**Indexed collections**

- `Array`

**Keyed collections**

- `Map`
- `Set`

Next I am going to show some versus between global objects that at first glance seem the same...

## Array VS Map VS Object VS Set

First I'm going to give a short definition of each one.

### Array

`Array` are list-like objects whose prototype has methods to perform traversal and mutation operations. It allows us to store data from any kind.

```js
const myArr = ["Apple", 1, 2, { id: 9, name: "Andrés" }, ["a", "b"]]

// at the end of the array
myArr.push("Bedoya")

// to a specific position
myArr[6] = "Bedoya"

const newArr = [...myarr, "Bedoya"]
```

### Map

`Map` is a data collection type, in which, data is stored in a form of pairs, which contains a unique key and value mapped to that key.

```js
let myMap = new Map()

//mapObj.set(key, value)
myMap.set(1, "a")
myMap.set("name", "Andrés")
myMap.set("myArr", [3, 9])
```

### Object

`Object` are used to store various keyed collections and more complex entities.

```js
const myObj = { a: 1, b: 2, c: 3, 1: "one" }

// using dot notation
myObj.key4 = "hello"

// using square bracket
myObj["key5"] = "five"
```

### Set

`Set` are objects that store a collection of values. Each value stored in a set is unique and can be of any data type.

```js
const mySet = new Set([1, 2, 3, 4, 5])

mySet // Set(5) {1, 2, 3, 4, 5}

mySet.add(5) // Set(5) {1, 2, 3, 4, 5}
```

Is not possible access to a unique value in the Set... You need to iterate over the entire `Set`

## 1. Access

### Array

Each item in an array has an index starting from 0.

```js
myArr[0] // Apple
```

### Map

You can access a value stored in the map using its key and the `get` method.

```js
// myMap.get(key)
myMap.get("name") // 'Andrés'
```

### Object

You can access a value stored in the object by using the same notations

```js
myObj.key4 // hello
myObj["key4"] // five
```

### Set

???

## 2. Length and Size

### Array

```js
myArr.length
```

### Map

```js
myMap.size
```

### Object

```js
Object.keys(myObj).length
```

### Set

```js
mySet.size
```

## 3. Find elements

### Array

```js
const arr = [1, 2, 3]

arr.includes(1) // returns true
```

### Map

```js
const map = new Map([
  [3, "three"],
  ["a", "one"],
])
map.has("a")
```

### Object

```js
const obj = { a: 1, b: 2, c: 3, 1: "one" }

obj.hasOwnProperty("a")
```

### Set

```js
const set = new Set([1, 2, 3, 4, 5])

set.has(4)
```

## 4. Delete

### Array

There is no a built-in method to remove elements from an array given a specific position, however we can write some methods to do this, one of the simplest would be:

```js
const arr = ["a", "b", "c"]
arr.filter(ele => ele !== "c") // ['a', 'b']
```

or

```js
arr.splice(position, 1)
```

Now, we can remove the **last** element from an array and return that element using `pop()` and we can remove the **first** element from an array using `shift()`

### Map

Map has its own built-in delete method to remove keys from a given map object:

```js
const map = new Map([
  [1, "one"],
  [2, "two"],
])

map.delete(1) // deletes [1, 'one'] and returns true
```

### Object

We can use the `delete` operator to remove a property from an object

```js
const obj = { b: "one", a: "two" }
delete obj.a
```

_However, this is widely discouraged in the javascript community_

### Set

We can use the built-in method:

```js
const set = new Set([1, 2, 3, 4, 5])

set.delete(3) // deletes 3 and returns true
```

If you want to remove all elements from Set

```js
set.clear()
```

## 5. Iterating

### Array

```js
const arr = [1, 3, 5, 9]

for (let value of arr) {
  console.log(value)
}

arr.forEach((value, index) => {
  console.log(`${index}: ${value}`)
})
```

### Map

```js
const map = new Map([1, 2], [3, 4], [5, 6])

for (let [key, value] of mapObj) {
  console.log(`${key} => ${value}`)
}

map.forEach((key, value) => {
  console.log(`${key} => ${value}`)
})
```

### Object

```js
const object = { a: 1, b: 2, c: 3 }

for (const property in object) {
  console.log(`${property}: ${object[property]}`)
}

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`)
}
```

### Set

```js
const set = new Set([1, 3, 4, 6, 2])

for (let value of set) {
  console.log(value)
}

set.forEach(value => {
  console.log(value)
})
```

## Conclusion

Now that you know these 4 types of global objects (with some of their differences and similarities) you can make a better choice the next time you face a programming problem; take a moment to think about which one best fits your task, this could make your code look cleaner and possibly perform with better performance.
