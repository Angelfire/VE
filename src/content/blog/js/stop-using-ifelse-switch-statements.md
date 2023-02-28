---
title: "Stop using If else and Switch statements"
slug: "js/stop-using-ifelse-switch-statements"
pubDate: "2021-04-21"
description: "Should we stop using If else and Switch statements? What should we use then?"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

This is quite difficult to explain, because I don't completely disagree with the use of if-else.

The main reason for the existence of the switch statement was to avoid if-else structure in certain cases.

Sometimes we have more than 1 comparison to do, since there could be many cases to evaluate, and at this point these statements become something tremendously verbose.

**Using if-else**

```js
function rating(rating) {
  if (rating === "five") {
    return "you are a super genius"
  } else if (rating === "four") {
    return "you are very smart"
  } else if (rating === "three") {
    return "you need to try harder, you are average"
  } else if (rating === "two") {
    return "you are not trying hard enough"
  } else if (rating === "one") {
    return "you should dedicate yourself to something else"
  }
}
```

**Using switch**

```js
function rating(rating) {
  switch (rating) {
    case "five":
      return "you are a super genius"
      break
    case "four":
      return "you are very smart"
      break
    case "three":
      return "you need to try harder, you are average"
      break
    case "two":
      return "you are not trying hard enough"
      break
    case "one":
      return "you should dedicate yourself to something else"
      break
  }
}
```

_Just a friendy reminder: when switch contained all value, the default case will never execute. So in this case, it is not necessary._

**Using Object Structure notation**

```js
const rating = {
  five: "you are a super genius",
  four: "you are very smart",
  three: "you need to try harder, you are average",
  two: "you are not trying hard enough",
  one: "you should dedicate yourself to something else",
}
```

What do you think about this?

Now this approach is very specific, suppose the following case:

```js
function temperatureGauge(temp) {
  if (temp <= 0) {
    return "you could freeze"
  } else if (temp > 0 && temp <= 15) {
    return "you must be warm"
  } else if (temp > 15 && temp <= 27) {
    return "you must stay well hydrated"
  } else if (temp > 27) {
    return "you should go to the beach"
  }
}
```

It's a perfect example where the object structure notation (and even a switch statement) cannot be applied so easily...

## The bottom line

We don't have to stop using if else and switch statements, they are still powerful, but we can create more readable and cleaner code using the object notation.
