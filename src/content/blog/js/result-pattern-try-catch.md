---
title: "Result Pattern vs Try/Catch in JavaScript: Streamlining Error Handling"
slug: "js/result-pattern-try-catch"
pubDate: "2024-07-18"
description: "Explore the Result pattern as an alternative to traditional try/catch in JavaScript. Learn the pros and cons of each approach and see practical examples, including API requests, to improve your error handling strategies."
author: "Andres Bedoya"
tags: ["JavaScript"]
---

The **Result pattern** is a different way to handle errors in JavaScript that many developers are starting to like. It's becoming popular because it makes error handling clearer and more predictable.

Instead of using `try/catch`, which throws and catches errors, the **Result pattern returns a simple object**. This object always tells you if something worked or failed, and gives you either the result or the error message.

This idea comes from other programming styles and languages, like _Rust_. In JavaScript, it's not built-in, but developers can choose to use it. It helps them think about possible errors at every step of their code.

The main point is to make error handling easier to understand and work with, especially in more complicated programs.

## Basic example

### Try/Catch

```js
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero")
    }
    return a / b
  } catch (error) {
    console.error("Error:", error.message)
    return null
  }
}

console.log(divide(10, 2)) // Output: 5
console.log(divide(10, 0)) // Output: Error: Division by zero, null
```

### Result pattern

```js
function divide(a, b) {
  if (b === 0) {
    return { success: false, error: "Division by zero" }
  }
  return { success: true, value: a / b }
}

const result1 = divide(10, 2)
if (result1.success) {
  console.log(result1.value) // Output: 5
} else {
  console.error("Error:", result1.error)
}

const result2 = divide(10, 0)
if (result2.success) {
  console.log(result2.value)
} else {
  console.error("Error:", result2.error) // Output: Error: Division by zero
}
```

## Intermediate example

### Try/Catch

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Fetch error:", error.message)
    return null
  }
}

fetchUser(123).then(user => {
  if (user) {
    console.log("User:", user)
  } else {
    console.log("Failed to fetch user")
  }
})
```

### Result patterns

```js
async function fetchUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`).catch(error => ({
    ok: false,
    error: error.message,
  }))

  if (!response.ok) {
    return {
      success: false,
      error: response.error || `HTTP error! status: ${response.status}`,
    }
  }

  const data = await response.json().catch(error => ({
    success: false,
    error: "Failed to parse JSON: " + error.message,
  }))

  if (!data.success) {
    return data // This is the error from JSON parsing
  }

  return { success: true, value: data }
}

fetchUser(123).then(result => {
  if (result.success) {
    console.log("User:", result.value)
  } else {
    console.error("Fetch error:", result.error)
  }
})
```

The Result pattern and try/catch are two approaches to error handling in JavaScript, each with its own strengths. While try/catch is a built-in language feature that's widely understood and simple to use for basic error handling, the Result pattern offers a more explicit and predictable way to manage errors. It achieves this by returning objects that represent either success or failure, rather than relying on exception throwing. This approach can lead to more composable and easier-to-reason-about code, especially in complex scenarios. However, it may require more setup and can be more verbose in simple cases. Ultimately, the choice between these methods depends on the specific needs of your project, with the Result pattern shining in situations that demand fine-grained error control and clear error states throughout the application.
