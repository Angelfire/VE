---
title: "ESM VS CJS modules"
slug: "js/esm-cjs-modules"
pubDate: "2023-07-25"
description: "ESM VS CJS modules, what are they and how are they used?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

On Twitter I constantly see discussions of this type, about the advantages, disadvantages, why to use them and why not, etc., so I decided to do some research to get out of my ignorance.

## What are ESM and CJS modules?
ESM (ECMAScript Modules) and CJS (CommonJS) modules are two different module systems used in JavaScript. They have some key differences in how they are imported, exported, and executed. Here's a brief comparison between the two.

### Syntax

- ESM: ECMAScript modules use import and export statements to define dependencies and export values. The import statement is asynchronous and hoisted, meaning it is evaluated before the rest of the code. The export statement is used to expose values from a module.

```js
import { funcionA, variableB } from './oneModule'

export function funcionC() {
  // ...
}
```

- CJS: CommonJS modules use require() to import modules and module.exports or exports to expose values. The require() function is synchronous and executed at runtime.

```js
const otroModulo = require('./oneModule.js')

function funcionC() {
  // ...
}

module.exports = {
  funcionC,
}
```

### Scope

- ESM: Each ESM has its own scope, meaning variables and functions declared within a module are local to that module unless explicitly exported.
- CJS: In CJS, modules share a single scope, so any variable or function declared in a module is accessible from other modules that require it.

### Static vs. Dynamic

- ESM: ESM is a static module system, which means the dependencies are determined at compile time. This allows for better optimization during bundling or tree-shaking.
- CJS: CJS is a dynamic module system, and the dependencies are resolved at runtime. This dynamic nature can sometimes make it harder to optimize during bundling.

### Browser and Node.js Support

- ESM: ESM is natively supported in modern browsers and Node.js (versions 12 and above) using the import and export keywords.
- CJS: CJS modules are the traditional format used in Node.js (versions prior to 12) and can be used in modern browsers using bundlers like Webpack or tools like Browserify _(I don't know if anyone still uses browserify)_.

### Top-level Async/Await

- ESM: ESM allows the use of top-level await statements directly in modules.
- CJS: CJS does not support top-level await statements; they can only be used inside async functions.

### Circular Dependencies

- ESM: ESM has better support for handling circular dependencies between modules.
- CJS: CJS can experience issues with circular dependencies, and developers need to be cautious when dealing with such cases.