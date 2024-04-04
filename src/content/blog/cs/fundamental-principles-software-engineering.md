---
title: "Fundamental Principles in Software Engineering"
slug: "cs/fundamental-principles-software-engineering"
pubDate: "2024-04-04"
description: "In the realm of software engineering, fundamental principles resembling guiding stars assist developers in navigating the intricacies of code. These principles, exemplified by DRY, KISS, WET, and YAGNI act as guiding lights, illuminating the way towards creating software that is effective, graceful, and straightforward to maintain."
author: "Andres Bedoya"
tags: ["CS"]
---

When I started my journey in the world of software development, I found myself constantly overwhelmed by the multitude of factors to consider when writing a program. I often fell into the trap of overthinking every aspect, from choosing the optimal data structure to deciding between different programming paradigms. This tendency led to what can be aptly described as "paralysis by analysis" — a state where I was perpetually stuck in the preliminary stages of planning and analysis, without ever daring to move forward and actually develop a prototype.

It wasn't until one transformative moment in a software engineering class that everything changed. The teacher casually mentioned the principle of **KISS** (Keep It Simple, Stupid), and suddenly, a new perspective emerged. The essence of KISS — advocating for simplicity in design and implementation — resonated deeply with me. It was a revelation that I didn't need to overcomplicate things or agonize over every decision. Instead, I could embrace simplicity and focus on delivering practical solutions.

In this short post I am going to try to explain some of the best-known principles with some simple examples... The most interesting thing of all is that if you think about it in depth, you can apply them to your personal life too...

## KISS (Keep It Simple, Stupid)

This principle suggests that simplicity should be a key goal in design and development. It encourages avoiding unnecessary complexity, which can make systems harder to understand and maintain.

```js
// Instead of:
function processData(data) {
  const validData = data.filter(item => item !== null && item !== undefined)

  const average = validData.reduce((total, item) => total + item, 0) / validData.length

  return average
}

// Prefer:
function filterValidData(data) {
  return data.filter(item => item !== null && item !== undefined)
}

function calculateAverage(data) {
  return data.reduce((total, item) => total + item, 0) / data.length
}
```

## DRY (Don't Repeat Yourself)

This principle advocates for avoiding repetition of code. It suggests that every piece of knowledge or logic should have a single, unambiguous representation within a system.

```js
// Instead of:
function calculateAreaOfRectangle(width, height) {
  return width * height
}

function calculatePerimeterOfRectangle(width, height) {
  return 2 * (width + height)
}

// Prefer:
function calculateRectangleProperties(width, height) {
  const area = width * height
  const perimeter = 2 * (width + height)

  return { area, perimeter }
}
```

## WET (Write Everything Twice)

This principle is usually understood in 2 different ways:

1. **WET**, seen as the antithesis of **DRY**, identifies instances where similar or identical code segments are needlessly repeated. This signals the need for refactoring to align with DRY principles, prioritizing code efficiency and maintainability by minimizing redundancy.

```js
// Instead of:
function greetUser() {
  console.log("Hello, user!")
}

function greetAdmin() {
  console.log("Hello, admin!")
}

// Prefer:
function greet(role) {
  console.log(`Hello, ${role}!`)
}
```

2. The other perspective allows developers to repeat similar code twice before considering abstraction, aiming to shift focus from premature optimization towards decision-making based on specific use cases. It advocates for flexibility and simplicity, permitting copying and pasting code for similar scenarios until it becomes repetitive enough to warrant abstraction. Additionally, it underscores the importance of commenting abstractions to enhance team understanding and ensure clarity in code maintenance.

```js
function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>
}

function Button({ isLoading, onClick, text }) {
  return <button onClick={onClick}>{isLoading ? <Loader /> : text}</button>
}
```

## YAGNI (You Ain't Gonna Need It)

This principle advises against adding functionality until it's necessary. It suggests that developers should not implement features or capabilities based on speculation or future requirements, but instead should focus on delivering the features that are currently needed. This principle helps to avoid over-engineering and unnecessary complexity in the codebase.

This principle for me is extremely valuable, for a very simple reason that is summarized in a phrase that I still don't know who the original author is: _"Premature optimization is the root of all evil"_.

There are other principles also well known such as <a class="hover:no-underline text-blue underline" href="https://www.velocidadescape.com/react/solid-principles-react-app" target="_blank" rel="noreferrer">SOLID</a> (which I already explained in a previous post).

- AHA (Avoid Hasty Abstractions), described by _Kent C. Dodds_ as optimizing for change first, and avoiding premature optimization.
- DAMP (Don't Abstract Methods Prematurely) by _Matt Ryer_.
- DAMP (Descriptive And Meaningful Phrases) by _Jay Fields_.
- MOIST
- DATE

And remember, read them and see if you can apply them to your personal life...
