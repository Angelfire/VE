---
title: "Circular dependency and Dependency injection in JavaScript"
slug: "js/circular-dependency-dependecy-injection"
pubDate: "2023-05-30"
description: "Circular dependency and Dependency injection in JavaScript. What are they?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

Very surely we have all faced a problem of circular dependencies at some point in life, it is not very complex to explain and sometimes it is not very difficult to solve.

Circular dependencies occur in JavaScript when two or more modules depend on each other in a way that creates a loop. In other words, Module A depends on Module B, and Module B depends on Module A, resulting in a circular reference.

Circular dependencies can lead to various issues and make it difficult to understand and maintain code. When the JavaScript runtime encounters circular dependencies, it may not be able to resolve them properly, resulting in errors or unexpected behavior.

Circular dependencies often happen due to poor module design or a lack of separation of concerns. They can occur when modules are tightly coupled and have interdependent relationships.

To fix circular dependencies, you can follow some best practices and use specific techniques:

1. Create a mediator module
2. Use asynchronous imports
3. Use dependency injection
4. ...

Dependency injection is a design pattern used in JavaScript to manage dependencies between different components or modules. It allows you to provide the dependencies required by a module from an external source, rather than having the module create or find them itself.

In JavaScript, dependency injection can be implemented in several ways:

1. Constructor Injection:

```js
class DependencyA {
  // ...
}

class DependencyB {
  // ...
}

class MyClass {
  constructor(depA, depB) {
    this.depA = depA
    this.depB = depB
  }
}

const depA = new DependencyA()
const depB = new DependencyB()
const instance = new MyClass(depA, depB)
```

In this example, the dependencies `depA` and `depB` are injected into the `MyClass` constructor when creating an instance of `MyClass`.

2. Setter Injection:

```js
class DependencyA {
  // ...
}

class DependencyB {
  // ...
}

class MyClass {
  setDepA(depA) {
    this.depA = depA
  }

  setDepB(depB) {
    this.depB = depB
  }
}

const depA = new DependencyA()
const depB = new DependencyB()
const instance = new MyClass()

instance.setDepA(depA)
instance.setDepB(depB)
```

In this example, the dependencies `depA` and `depB` are set using setter methods after creating an instance of `MyClass`.

3. Interface Injection:

```js
class DependencyA {
  // ...
}

class DependencyB {
  // ...
}

class MyClass {
  setDependencies(deps) {
    this.depA = deps.depA
    this.depB = deps.depB
  }
}

const depA = new DependencyA()
const depB = new DependencyB()
const instance = new MyClass()

instance.setDependencies({ depA, depB })
```

4. Function Parameter Injection:

```js
class DependencyA {
  // ...
}

class DependencyB {
  // ...
}

function myFunction(depA, depB) {
  // ...
}

const depA = new DependencyA()
const depB = new DependencyB()

myFunction(depA, depB)
```

In this example, the dependencies `depA` and `depB` are passed as parameters when invoking the `myFunction` function.

And now, a real example:

```js
class UserService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getUser(id) {
    return this.httpClient.get(`/users/${id}`);
  }

  createUser(user) {
    return this.httpClient.post('/users', user);
  }
}

class HttpClient {
  get(url) {
    // Code to make a GET request
  }

  post(url, data) {
    // Code to make a POST request
  }
}

// Example usage
const httpClient = new HttpClient();
const userService = new UserService(httpClient);

userService.getUser(123)
  .then((user) => {
    // Handle the retrieved user
  })
  .catch((error) => {
    // Handle errors
  });

const newUser = { name: 'John Doe', email: 'john@example.com' };
userService.createUser(newUser)
  .then((createdUser) => {
    // Handle the created user
  })
  .catch((error) => {
    // Handle errors
  });
```

In this example, the UserService class depends on the HttpClient class, which is injected into the UserService constructor. The HttpClient is responsible for making HTTP requests, while the UserService focuses on handling user-related operations.

By injecting the HttpClient dependency, we can easily switch between different HTTP clients or mock the HTTP requests during testing. This approach promotes modularity, testability, and flexibility in your codebase.

> Note that the example above is simplified for illustration purposes. In real-world applications, you might use libraries or frameworks that provide more advanced dependency injection capabilities or use decorators to automatically handle the injection process.

## Dependency injection in React
React.js does not use traditional dependency injection as a core feature. However, React's component-based architecture and the use of props can be seen as a form of dependency injection.

In React, components can receive data and functionality through props, which are analogous to injected dependencies. Parent components can pass data and functions down to child components via props, allowing for composition and reusability of components.

Here's an example of how props can be used to simulate dependency injection in React:

```js
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  return <UserList users={users} />;
}
```

While React does not provide a built-in dependency injection container or explicit support for resolving dependencies, it encourages the composition of components and passing data and functions through props, which achieves a similar outcome to dependency injection. This approach allows for flexible and reusable component design within a React application.
