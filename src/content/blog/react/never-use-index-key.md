---
title: "Never use the index for the key in React"
slug: "react/never-use-index-key"
pubDate: "2024-03-15"
description: "Avoid index as keys in React lists! It leads to bad performance and unexpected behavior. Use stable IDs for smooth rendering."
author: "Andres Bedoya"
tags: ["React"]
---

Yesterday I was involved in a small discussion about a <a class="hover:no-underline text-blue underline" href="https://twitter.com/joshmedeski/status/1768346029273850143" target="\_blank" rel="noreferrer">Tweet</a>, which said something like:

> PSA: never use the index for the key in @reactjs 🔑 #webdev #development #react

I have seen that this error is more common and recurring than we would like, so I am going to try to briefly explain why we should **NOT** use index (or anything related) as keys in React.

- **Stability**: The index of an item in a list can change if items are added, removed, or reordered. Using the index as the key can cause React to incorrectly identify components and lead to unintended re-renders or reconciliation issues.
- **Uniqueness**: React keys should be unique within the scope of their siblings. If the list items don't have unique keys, React may not be able to properly identify and update individual components when the list changes, potentially leading to bugs and UI inconsistencies.
- **Performance**: React relies on keys to optimize rendering and reconciliation. When keys are not unique or stable, React may need to re-render more components than necessary, leading to decreased performance and efficiency.

## Examples

### Incorrect

- **Key Composition**: The key is composed of two parts: `fruit` and `index`. While this might seem like a unique identifier, it's not entirely true. If you add or remove items from the list, the `index` values of all subsequent items will change. This means that even though the `fruit` value might stay the same, the key will change, causing React to re-render the entire list unnecessarily.
- **String Concatenation**: Using string concatenation for key generation is not ideal from a performance perspective. It adds an extra step during the rendering process, which can be significant for large lists.

```js
const fruits = ["Apple", "Pear", "Kiwi"]

const FruitList = () => {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

```js
const fruits = ["Apple", "Pear", "Kiwi"]

const FruitList = () => {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={`fruit-${index}`}>{fruit}</li>
      ))}
    </ul>
  )
}
```

## Correct

This is correct because every single value is unique, so, don't be afraid of using values as keys.

- **Unique Values**: The fruits array contains unique strings ("Apple", "Pear", "Kiwi"). This is crucial for using values as keys effectively. Each value uniquely identifies a specific item in the list.
- **Stable Identity**: The values in the fruits array are assumed to remain constant throughout the component's lifecycle. This stability is essential for keys to function correctly. React can rely on the value to determine which item has changed or stayed the same, allowing for efficient updates.

```js
const fruits = ["Apple", "Pear", "Kiwi"]

const FruitList = () => {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}
```

Even this id is better and more reliable than using index:

```js
const fruits = [
  { id: 0, name: "Apple" },
  { id: 1, name: "Pear" },
  { id: 2, name: "Kiwi" },
]

const FruitList = () => {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  )
}
```

## Can I use `crypto.randomUUID()` or `UUID()`?

Yes, you can, but you shouldn't, on very re-render, this functions will generate new pseudo-random numbers (which affects performance a bit), the ideal is that this id persists over time.

Thanks to _Petr Hurtak_ and _Jake Casto_ for the little explanations!
