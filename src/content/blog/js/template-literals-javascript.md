---
title: "Do people understand how Template Literals work in JavaScript?"
slug: "js/people-dont-understand-template-literals"
pubDate: "2023-11-09"
description: "Do people understand how Template Literals work in JavaScript? And what about Server Actions in React"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

At the most recent Next.js Conf the Vercel team did a short demo about Server Actions, people literally went crazy, they started comparing React with PHP, talking about how insecure this could be, in the end, the only truth is that completely misses everything that we were once taught about the separation of concerns.

This is what a <a class="hover:no-underline text-blue underline" href="https://react.dev/reference/react/use-server" target="_blank" rel="noreferrer">Server Actions</a> looks like, which first of all, is not something that Vercel is introducing in Next.js, it is something that the React team is working on but is in a very early stage of development.

```jsx
import { sql } from "@vercel/postgress"

export default function Home() {

    async function myServerAction(formdata) {
        "use server"

        const user = formdata.get("username")
        const { rows } = await sql`SELECT * FROM users WHERE user = ${user};` 
    }

    return (
        <form action={myServerAction}>
            <input type="text" name="username" />
            <button type="submit">Submit</button>
        </form>
    )
}
```

The previous example was widely criticized because at first glance doing a SQL injection is (according to critics and cybersecurity experts) incredibly easy... But, **IT IS NOT TRUE**...

## What is a Template Literal?
A Template Literal is a special way of creating text strings in JavaScript. It's like a more advanced version of putting words in quotes to make a sentence in the code.

What makes it special is that you can put things like variables, calculations, or function results right inside the sentence. This is done by wrapping them in `${}` inside the sentence.

Also, if you want to write a long sentence that goes over several lines, you don't need to do anything special. Just hit enter and keep typing, the Template Literal will understand.

Think of it like a more flexible and powerful way to create and manage sentences in your code.

### Syntax


```js
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tagFunction`string text ${expression} string text`
```

This would be a terrible implementation of a tagFunction to execute a query:

```js
function sql(strings, ...values) {
  let query = strings[0];

  for (let i = 0; i < values.length; i++) {
    const sanitizedValue = typeof values[i] === 'string' ? `'${values[i]}'` : values[i];
    query += sanitizedValue + strings[i + 1];
  }

  return `Executing SQL Query: ${query}`;
}
```

Clearly the tagFunction they're using in Vercel is developed by engineers who really know what they're doing, so I'm sure the tons of security concerns people are talking about were taken into account when making this development.

My recommendation is that before speaking, make sure you do a little research..