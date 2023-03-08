---
title: "Using AbortController in React"
slug: "react/using-abortcontroller-react"
pubDate: "2023-03-07"
description: "Can't perform a React state update on an unmounted component. Using AbortController, why and how"
author: "Andres Bedoya"
tags: ["React"]
---

The use of `AbortController` is helpful in situations where a network request needs to be canceled before it completes, such as when the user navigates to a different page or when a request needs to be interrupted that is taking too long to complete.

`AbortController` provides a more flexible and precise way to cancel network requests. By creating an instance of `AbortController`, a **signal** can be generated that can be passed to a network request. If the `abort()` method of the abort controller is called at any time before the request completes, a cancellation signal will be emitted that can be detected in the client code. This allows for immediate cancellation of a request, which can save time and improve the user experience.

How many times have you seen the following error:

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

Ever wondered why this happens?

This can occur due to some of the following situations:

- User navigation: If the user navigates to another page while a network request is being made, you may want to cancel that request immediately to prevent unnecessary operations and release resources.
- Real-time updates: If a React application needs to update data in real-time, but the data may change too frequently, it may be useful to cancel previous update requests before sending new requests. This can help reduce the number of unnecessary network requests and improve the overall performance of the application.
- User behavior: In some cases, it may be useful to cancel a network request if the user performs a specific action, such as closing a dialog box or changing a filter in a list of items.

In these edge cases, it is where `AbortController` is useful and helps us to avoid these possible errors.

```js
import { useState, useEffect } from 'react'

function Example() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController()

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
          signal: abortController.signal
        })
        const json = await response.json()

        setData(json)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          setError(error)
        }
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } 
  
  if (!data) {
    return <div>Loading...</div>
  } 

  return (
    <div>
      <p>Title: {data.title}</p>
      <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

To use `AbortController` in React, follow these steps:

1. Create an instance of `AbortController` using the `new AbortController()` method.
2. Create a variable to store a reference to the abort controller.
3. Use the `signal` method of the `AbortController` instance to create a signal that will be passed to the `fetch` method as an option.
4. Use the `abort()` method of the abort controller to cancel the request.

If you are using axios, they deprecated <a class="hover:no-underline text-blue underline" href="https://axios-http.com/docs/cancellation#cancel-token-code-deprecated-code" target="_blank" rel="noopener noreferrer">CancelToken</a>, so, you can use AbortController.

In general, `AbortController` is useful in any case where it is necessary to cancel a network request at a specific point in time to improve the user experience and avoid unnecessary operations.
