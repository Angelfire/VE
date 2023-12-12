---
title: "Dynamic classes in Tailwind"
slug: "css/dynamic-classes-tailwind"
pubDate: "2023-02-14"
description: "Dynamic classes in Tailwind, how to work with them"
author: "Andres Bedoya"
tags: ["CSS", "TailwindCSS"]
---

Yesterday I was playing with OpenAI (as usual), creating one of my many experiments, testing new prompts, etc.

## <a class="hover:no-underline text-blue underline" href="https://github.com/Angelfire/colorette" target="_blank" rel="noreferrer">Colorette</a>
![Colorette](https://user-images.githubusercontent.com/315504/218640623-ebb99f22-96bc-41c7-8ec4-c774cbf1a590.png)

Basically the idea is to generate a color palette with a description and a title based on a series of words that we indicate to the AI, up to this point it looks like a fairly simple data structure:

```js
type Color = {
  hex: string
  name: string
  pantone: string
  rgb: string
}

type PaletteProps = {
  colors: Color[]
  description: string
  title: string
}
```

So, based on the OpenAI response, my ideas was to render this (of course using TailwindCSS):
```js
export const Palette = ({ colors }: PaletteProps) => (
  <div className="mt-12 flex flex-col items-center">
    <div className="grid grid-cols-5 gap-3">
    {colors.map(color => (
      <div className={`bg-[${color.hex}] h-11 w-4`} key={color.name} />
    ))}
    </div>
  </div>
)
```
It seemed logical and simple... Why wouldn't it work?

Spoiler, It didn't work...

I tried many things, but in the end I had to open a <a class="hover:no-underline text-blue underline" href="https://github.com/tailwindlabs/tailwindcss/discussions/10574" target="_blank" rel="noreferrer">discussion in Github</a>, the first answer was very interesting:

>The most important implication of how Tailwind extracts class names is that it will only find classes that exist as complete unbroken strings in your source files.

What it means?

**Don't construct class names dynamically**
```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

**Always use complete class names**
```html
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

**Don't use props to build class names dynamically**
```js
function Button({ color, children }) {
  return (
    <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>
      {children}
    </button>
  )
}
```

It was exactly my scenario...

So, I "re mapped" my color array, to have something like:
```js
{hex: 'bg-[#F8A06F]', name: 'Coral Reef', pantone: '17-1563', rgb: '248, 160, 111'}
```

It didn't work either...

Finally, this is what worked for me:
```js
{colors.map(color => (
  <div
    style={{ backgroundColor: `${color.hex}` }}
    className="h-24 w-9"
    key={color.name}
  />
))}
```

Why?

According to an answer from Adam (the creator of Tailwind):
> Yeah this works because inline styles are handled by the browser at run-time but Tailwind has to compile a stylesheet ahead of time at build time. For dynamic styles like this I would generally recommend using inline styles like you are here 👍🏻
