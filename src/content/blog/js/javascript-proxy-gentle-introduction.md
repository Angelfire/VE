---
title: "Javascript Proxy, a gentle introduction"
slug: "js/javascript-proxy-gentle-introduction"
pubDate: "2020-08-28"
description: "Do you know what is a JavaScript Proxy? Do you know its purpose? have you ever used it?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

A couple of months ago I was asking to my colleagues if they knew what JavaScript Proxies were for, I think that none had used it yet, so I decided to read a little more about its use.

Proxy object was a new feature that was introduced in ES6. **They allow you to intercept and customize operations performed on objects. E.g., function invocation, assignment, property lookup, enumeration, etc. We use proxies for blocking direct access to the target function or object.**

JavaScript Proxy is too powerful a tool, which if used correctly could bring us a lot of excellent benefits.

The simplest example of a functioning Proxy is one with a single trap, in this case, a get trap that always returns “John Doe”.

```javascript
let target = {
  firstName: 'Andres',
  lastName: 'Bedoya'
};

const handler = {
  get: (obj, prop) => 'John Doe'
};

target = new Proxy(target, handler);

target.firstName  // John Doe
target.lastName // John Doe
```

The result is an object that will return *"John Doe"* for any property access operation. That means `target.firstName`, `target['lastName']`, `Reflect.get(target, 'firstName')`, etc.

And this is an example just a little more complex:

```javascript
const proxyHandler = {
  get(target, name) {
    if (name !== 'push') {
      return target[name];
    }

    const push = value => {
      if (typeof value !== 'number') {
        throw new TypeError('The array only accepts numbers');
      }

      return target.push(value);
    }

    return push;
  },
  set(target, index, value) {
    if (index > -1) {
      if (typeof value !== 'number') {
        throw new TypeError('The array only accepts numbers');
      }

      target[name] = value;
    }
    
    return true;
  }
}

const arr = [3, 5, 9];
const arrProxy = new Proxy(arr, proxyHandler);

arrProxy.push(2);
arrProxy // Proxy {0: 3, 1: 5, 2: 9, 3: 2}

arrProxy.push('42'); // Uncaught TypeError: The array only accepts numbers
arrProxy[32]; // Uncaught TypeError: The array only accepts numbers
```

I just started exploring this incredible feature, but if you want to read a post from someone with more experience, I highly recommend this post: <a class="hover:no-underline text-blue underline" href="https://blog.bitsrc.io/a-practical-guide-to-es6-proxy-229079c3c2f0/" target="_blank" rel="noopener noreferrer">A practical guide to Javascript Proxy</a> from Thomas Barrasso. In his post you can find more than half a dozen interesting examples.

And of course, a gentle introduction from <a class="hover:no-underline text-blue underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank" rel="noopener noreferrer">MDN web docs</a>
