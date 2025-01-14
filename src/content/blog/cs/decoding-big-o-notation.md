---
title: "Decoding Big O Notation: A Clear Guide to Algorithm Efficiency"
slug: "cs/decoding-big-o-notation"
pubDate: "2024-03-04"
description: "Decoding Big O Notation: A Clear Guide to Algorithm Efficiency"
author: "Andres Bedoya"
tags: ["CS"]
---

The majority of individuals I've worked with throughout my career tend to pay little attention to performance; their main concern is completing tasks. Unfortunately, many do not take the time to measure or even minimally assess the impact of the code they've just delivered. This guide not only explains **Big O Notation** in simple terms but also sheds light on the crucial aspect of why understanding and optimizing code performance can lead to more efficient and impactful software development.

In simple terms, Big O Notation is a way of expressing how the performance of an algorithm scales with the size of the input data.

For non-programmers, think of it like planning a party: If you have a small guest list (constant time, `O(1)`), you can quickly find a venue. As the guest list grows (linear time, `O(n)`), the time and effort needed increase proportionally. If you organize the party in a way that the number of guests doubles, but the effort only increases slightly (logarithmic time, `O(log n)`), that's analogous to more efficient algorithms.

So, whether you're planning a celebration or just curious about how technology works behind the scenes, this guide is designed to resonate with everyone, regardless of their technical background.

Suppose we want to write a function that calculates the sum of all numbers from 1 up to (and including) some number n.

We have 2 options:

```js
function addUpTo(n) {
  let total = 0

  for (let i = 1; i <= n; i++) {
    total += i
  }

  return total
}
```

Or:

```js
function addUpTo(n) {
  return (n * (n + 1)) / 2
}
```

Which one is better?

The first function uses a loop to add up all the numbers, while the second function uses a mathematical formula to calculate the sum. The first function has a time complexity of `O(n)` because the number of operations grows linearly with the size of the input. The second function has a time complexity of `O(1)` because the number of operations is constant, regardless of the size of the input.

**Big O Notation is a way to formalize fuzzy counting. It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow.**

We say that an algorithm is **O(f(n))** if the number of simple operations the computer has to do is eventually less than a constant times **f(n)**, as **n** increases:

- f(n) could be linear (f(n) = n)
- f(n) could be quadratic (f(n) = n2)
- f(n) could be constant (f(n) = 1)
- f(n) could be something entirely different!

## Big O Notation in JavaScript

### Big O of Objects

- Insertion - O(1)
- Removal - O(1)
- Updating O(1)
- Searching - O(N)
- Access - O(1)

### Big O of Object Methods

- Object.keys - O(N)
- Object.values - O(N)
- Object.entries - O(N)
- hasOwnProperty - O(1)

### Big O of Arrays

- Insertion - It depends
- Removal - It depends
- Searching - O(N)
- Access - O(N)

### Big O of Array Methods

- push - O(1)
- pop - O(1)
- shift - O(N)
- unshift - O(N)
- concat - O(N)
- slice - O(N)
- splice - O(N)
- sort - O(N \* log N)
- forEach/map/filter/reduce/etc. - O(N)

## Big O Notation Examples

![Big O Notation](https://github.com/Angelfire/VEAstro/assets/315504/24f2270c-3a8a-45fe-8d36-d9b007294a41)

### O(1) - Constant Time:

```js
function addUpTo(n) {
  return (n * (n + 1)) / 2
}
```

- Looking up an item in a small list (e.g., a list of 5 items).
- Getting the value of a variable.
- Adding two numbers.

### O(log n) - Logarithmic Time

```js
function binarySearch(list, item) {
  let low = 0
  let high = list.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (list[mid] === item) {
      return mid
    } else if (list[mid] < item) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return -1 // Item not found
}
```

- Finding the position of an element in a sorted array.
- Range queries in balanced search trees.
- Priority queues with element updates.
- Finding closest elements in sorted arrays.
- Finding intersections of sorted arrays.
- String matching algorithms.

### O(n) - Linear Time

```js
function countPeople(room) {
  let count = 0

  for (const person of room) {
    count++
  }

  return count
}
```

- Traversing a list and performing an operation on each item (e.g., printing each item).
- Searching for an item in a large list (e.g., a list of 1000 items) using a for loop.
- Counting the number of words in a sentence.

### O(n log n) - Linearithmic Time

```js
function quicksort(array) {
  if (array.length <= 1) return array

  const pivot = array[0]
  const left = array.slice(1).filter(item => item <= pivot)
  const right = array.slice(1).filter(item => item > pivot)

  return [...quicksort(left), pivot, ...quicksort(right)]
}
```

- Finding the median of two sorted arrays.
- Finding all pairs in two sorted arrays that sum to a specific value.

### O(n^2) - Quadratic Time

```js
function bubbleSort(array) {
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }

  return array
}
```

- Sorting a list of numbers using the bubble sort algorithm.
- Calculating the distance between two points on a Cartesian plane.
- Finding the shortest path between two cities on a map.

### O(n^3) - Cubic Time:

```js
function cubicOperation(array) {
  let result = 0

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        result += array[i] * array[j] * array[k]
      }
    }
  }

  return result
}
```

- Finding all pairs of elements in an array that sum to a specific value using a nested loop approach (brute force).
- Computing the cube of the sum of the first n natural numbers (involves nested loops for summation and cubing).
- Multiplying two square matrices using the naive matrix multiplication algorithm (involves nested loops for row and column iterations).

### O(2^n) - Exponential Time

```js
function fibonacci(n) {
  if (n <= 1) return n

  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

- Generating all binary strings of length n
- Solving the knapsack problem (decision version)

### O(n!) - Factorial Time

```js
function factorial(n) {
  if (n === 0 || n === 1) return 1

  return n * factorial(n - 1)
}
```

- Generating all possible permutations of a list (involves exploring all possible arrangements, leading to factorial growth).
- Solving the traveling salesperson problem using a brute-force approach (trying all possible routes between n cities).

## Ignoring Big O Notation in Software Development is a mistake you can't afford to make

Ignoring Big O notation can have significant consequences for your code's performance and scalability. Big O notation provides an estimate of an algorithm's efficiency in terms of its worst-case time complexity. Here are the potential impacts of disregarding Big O notation:

1. **Performance Issues**: Algorithms with higher time complexities (e.g., `O(n^2)` or `O(2^n)`) can lead to poor performance, especially when dealing with large datasets. Ignoring Big O may result in the use of inefficient algorithms, causing slower execution times and suboptimal user experiences.
2. **Scalability Concerns**: As the size of your input data grows, the impact of inefficient algorithms becomes more pronounced. Code that performs well with small datasets may become impractical or even unusable when faced with larger volumes of data. Big O helps you assess how well your code will scale.
3. **Resource Consumption**: Inefficient algorithms can consume more system resources (such as CPU and memory), leading to increased costs and decreased overall system efficiency. Understanding Big O helps you make informed decisions about resource allocation.
4. **Maintenance Challenges**: Codebases that lack awareness of algorithmic efficiency may be challenging to maintain and debug. As datasets grow or usage patterns change, the lack of optimization may result in unexpected performance issues, making maintenance more complex.
5. **Ineffective Problem Solving**: Understanding Big O notation is crucial when solving complex problems. Ignoring it might lead to choosing inappropriate algorithms, hindering your ability to design efficient and effective solutions.

Read more:

- <a class="hover:no-underline text-blue underline" href="https://mathworld.wolfram.com/ArithmeticSeries.html" target="_blank" rel="noreferrer">Arithmetic Series</a>
- <a class="hover:no-underline text-blue underline" href="https://www.bigocheatsheet.com/" target="_blank" rel="noreferrer">Big-O Cheat Sheet</a>
- <a class="hover:no-underline text-blue underline" href="https://web.mit.edu/16.070/www/lecture/big_o.pdf" target="_blank" rel="noreferrer">Big O Notation (MIT)</a>
- <a class="hover:no-underline text-blue underline" href="https://www.youtube.com/watch?v=D6xkbGLQesk" target="_blank" rel="noreferrer">Introduction to Big O Notation and Time Complexity (Data Structures & Algorithms #7)</a>
