---
title: "Memory Management in JavaScript and Garbage Collector"
slug: "js/memory-management-js-garbage-collector"
pubDate: "2023-05-11"
description: "How is memory management in javascript and how garbage collector works"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

<a class="hover:no-underline text-blue underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management" target="_blank" rel="noopener noreferrer">Memory management</a>

> Low-level languages like C, have manual memory management primitives such as `malloc()` and `free()`. In contrast, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore (garbage collection). This automaticity is a potential source of confusion: it can give developers the false impression that they don't need to worry about memory management.

The last part of the text above is extremely important, **it gives a false impression that we do NOT need to worry about memory management**, which is why we go around writing code like crazy and crashing the browser wildly...

Imagine that your house is your computer's memory, and the objects you create in JavaScript are like toys that you leave in different places around your house. Every time you no longer need a toy, it's like throwing it away. But sometimes you forget to throw away some toys and they stay in your house (computer's memory) taking up space.

The garbage collector's job is to search for those toys that you no longer use and remove them from your house so you have more free space. To do this, the garbage collector constantly checks all the objects you have created in JavaScript and looks for those that are no longer being used by your code. When it finds one of these objects, it removes it from memory to free up space.

It seems easy right?, but sometimes we make mistakes and use memory incorrectly.

## Common errors

1. **Creating global variables**: If we create global variables, they will remain in memory throughout the lifetime of the page, which can cause performance and memory issues in the long run.

_Solution_: Instead, we should try to limit the scope of variables and functions as much as possible so that they only exist during the time they are needed. It is recommended to use the module pattern or classes to encapsulate the logic of our application.

2. **Creating multiple elements with events without removing them**: If we create multiple elements in our DOM that have associated events, and we do not remove these elements properly, we can accumulate many event handlers in memory and generate performance loss.

```js
for (let i = 0; i < 10000; i++) {
  const button = document.createElement("button")

  button.innerText = "Do something"

  button.addEventListener("click", () => {
    console.log("Button clicked.")
  })

  document.body.appendChild(button)
}
```

_Solution_: To avoid this problem, we must properly remove the elements and their associated events when they are no longer needed. We can do this by removing the element from the DOM or using the `removeEventListener()` method to remove the event handlers.

3. **Not freeing up memory in loops**: If we create loops that generate large amounts of objects or data, and we do not properly free up memory, we can generate performance and memory issues in the long run.

```js
const objectArray = [];

for (let i = 0; i < 10000; i++) {
  objectArray.push({ number: i })
}
```

_Solution:_ To avoid this problem, we must properly free up the memory assigned to the objects or data generated in our loops. We can do this by using the `delete` method or assigning null to the objects and data that we no longer need.

## How to manage memory correctly

1. **Use Object Pooling**: Object Pooling is a technique where you reuse objects instead of creating new ones. This helps to reduce memory allocation and garbage collection overhead. For example, let's say you have a game that needs to create many bullet objects. Instead of creating a new bullet object every time you fire a bullet, you can use object pooling to reuse existing bullet objects.

```js
// create a bullet object pool
const bulletPool = []

function createBullet() {
  let bullet

  if (bulletPool.length) {
    bullet = bulletPool.pop()
  } else {
    bullet = new Bullet()
  }
  return bullet
}

function destroyBullet(bullet) {
  // reset bullet properties
  bullet.x = 0
  bullet.y = 0
  bullet.speed = 0

  // add bullet back to the pool
  bulletPool.push(bullet)
}
```

2. **Avoid creating unnecessary closures**: Closures in JavaScript can be memory-intensive, so it’s important to avoid creating them unnecessarily. For example, let's say you have a loop that creates an event listener for each element in an array. Instead of creating a closure for each event listener, you can use a single event listener and use event delegation to handle events.

```js
// create an array of elements
const elements = document.querySelectorAll('.element')

// add a click event listener to each element
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handleClick)
}

// handle click event
function handleClick(event) {
  // do something with the clicked element
}
```

In this example, we avoid creating unnecessary closures by using event delegation. Instead of creating a new event listener for each element in the array, we create a single event listener on a parent element and use the event.target property to handle events on the clicked element.

3. **Use WeakMap and WeakSet**: `WeakMap` and `WeakSet` are two built-in JavaScript data structures that can help to manage memory. They are similar to `Map` and `Set`, but they allow objects to be garbage collected even if they are still referenced in the data structure. This can help to avoid memory leaks in your application.

About the latter I am not going to give an example, since the idea is to write a complete article about its use...