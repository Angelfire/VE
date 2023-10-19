---
title: "SOLID principles applied to an application with React"
slug: "react/solid-principles-react-app"
pubDate: "2023-10-19"
description: "What are the SOLID principles and how to apply them to our applications made with React"
author: "Andres Bedoya"
tags: ["React"]
---

SOLID is an acronym that represents a set of five design principles for writing maintainable and scalable software. These principles were introduced by Robert C. Martin and have become fundamental concepts in object-oriented programming. While React is primarily a library for building user interfaces and doesn't directly map to classical object-oriented programming, you can still apply SOLID principles in a React context, especially when using functional components and hooks. Here's a brief overview of each SOLID principle along with examples in a React context:

1. **Single Responsibility Principle (SRP)**:
SRP states that a class (or in our case, a functional component) should have only one reason to change. In React, this translates to each component having a single responsibility.

Before SRP:
```jsx
// UserList component with mixed responsibilities
const UserList = () => {
  // Fetching and rendering users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from an API
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      )}
    </div>
  );
};
```

After SRP:
```jsx
// UserList component with a single responsibility
const UserList = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      )}
    </div>
  );
};

// UserFetching component to fetch users
const UserFetching = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from an API
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return <UserList users={users} />;
};
```

2. **Open/Closed Principle (OCP)**:
OCP states that software entities (components in React) should be open for extension but closed for modification. In the React context, this means you should be able to add new features or behaviors without changing existing code.

Before OCP:
```jsx
// Button component with conditional rendering
const Button = ({ isPrimary }) => {
  if (isPrimary) {
    return <button className="primary-button">Primary Button</button>;
  } else {
    return <button className="secondary-button">Secondary Button</button>;
  }
};
```

After OCP:
```jsx
// Button component with extension
const Button = ({ children }) => {
  return <button>{children}</button>;
};

// PrimaryButton component extends Button
const PrimaryButton = ({ children }) => {
  return <button className="primary-button">{children}</button>;
};
```

3. **Liskov Substitution Principle (LSP)**:
LSP states that objects of a subclass (or in React, child components) should be able to replace objects of the parent class (or parent component) without affecting the correctness of the program.

Before LSP:
```jsx
// Parent component expecting any child component
const Parent = ({ childComponent }) => {
  return <div>{childComponent}</div>;
};
```

After LSP:
```jsx
// Parent component that specifies a prop interface
const Parent = ({ children }) => {
  return <div>{children}</div>;
};

// Child components can be any React component
const Child1 = () => <div>Child 1</div>;
const Child2 = () => <div>Child 2</div>;
```

4. **Interface Segregation Principle (ISP)**:
ISP states that clients should not be forced to depend on interfaces they do not use. In React, this translates to components having small, focused APIs.

Before ISP:
```jsx
// UserCard with a monolithic interface
const UserCard = ({ user, onClick, onEdit, onDelete }) => {
  return (
    <div>
      <div>{user.name}</div>
      <button onClick={onClick}>View</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};
```

After ISP:
```jsx
// Smaller components with focused interfaces
const UserAvatar = ({ user }) => {
  return <div>{user.name}</div>;
};

const UserActions = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};
```

5. **Dependency Inversion Principle (DIP)**:
DIP states that high-level modules (components) should not depend on low-level modules (components); both should depend on abstractions (interfaces or props).

Before DIP:
```jsx
// UserList directly importing UserService
import UserService from './UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from UserService
    UserService.fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      )}
    </div>
  );
};
```

After DIP:
```jsx
// UserList receiving a user list as a prop
const UserList = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      )}
    </div>
  );
};

// In a higher-level component or module, use UserService and pass the data to UserList.
import UserService from './UserService';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from UserService
    UserService.fetchUsers().then((data) => setUsers(data));
  }, []);

  return <UserList users={users} />;
};
```

I hope this is useful to you...
