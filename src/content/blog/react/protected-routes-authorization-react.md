---
title: "Protected routes and authorization using React Router v6"
slug: "react/protected-routes-authorization-react"
pubDate: "2022-03-03"
description: "How to: Protect routes based on authorization using React Router v6"
author: "Andres Bedoya"
tags: ["React"]
---

In the project I am currently working on, a specific need arose, we should protect certain routes of a web application from certain user roles (for security reasons). For example, we have a page where administrators can add and delete users, this power can only be held by us (this must be a private page).

**React Router v6** (latest version), it does not offer any functionality for this type of situation, the implementation is the developer's task.

My first approach to the problem was to try to build a "wrapper" for the `Route` component of React Router:

```js
import { Navigate, Route } from "react-router-dom"

function MyOwnRoute({ path, element, isRoot = false }) {
  return (
    <>
      {isRoot ? (
        <Route path={path} element={element} />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </>
  )
}

export default MyOwnRoute
```

```js
<Routes>
  <Route path="contact" element={<Contact />} />
  <MyOwnRoute path="dashboard" element={<Dashboard />} isRoot={true} />
</Routes>
```

Which quickly ended up becoming an error:

> Uncaught Error: [MSRoute] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>

I remember that in previous versions (5 for example) we could have something like:

```js
<Router>
  <Switch>
    <Route path="contact" component={<Contact />} />
    <MyOwnRouteComponent path="/" component={<Home />} />
  </Switch>
</Router>
```

And everything worked perfectly, it seems that this recent version they got a little more strict...

> To determine the role of the user who is logged into the application, I simply create a global React Context (I will not show this for security reasons) that I fill it with the information provided by our identity and access management solution. This way we have access to user information wherever we need it.

With this in mind and knowing a little more about the React Router version 6 API, the development of the new wrapper is much simpler:

```js
import { Navigate } from "react-router-dom"
import { UserContext } from "UserContext"
import { useContext } from "react"

function RequireAuth({ children, roles }) {
  const {
    user: { role },
  } = useContext(UserContext)

  return roles.includes(role) ? children : <Navigate to="/" replace />
}

export default RequireAuth
```

And finally:

```js
<Routes>
  <Route path="contact" element={<Contact />} />
  <Route
    path="dashboard"
    element={
      <RequireAuth roles={["root", "super_admin"]}>
        <Dashboard />
      </RequireAuth>
    }
  />
</Routes>
```

I don't know if there is a cleaner or more elegant solution, but at the moment this one works perfect for me.

Happy coding!
