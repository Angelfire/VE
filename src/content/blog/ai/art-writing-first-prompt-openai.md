---
title: "The art of writing your first prompt"
slug: "ai/art-writing-first-prompt-openai"
pubDate: "2023-01-17"
description: "The art of writing your first for OpenAI"
author: "Andres Bedoya"
tags: ["AI"]
---

**Disclaimer**: This is not a guide by any means, I am a newbie in this but I am learning.

I know by now you may be tired of hearing so much about OpenAI and ChatGPT. The Hype is at its peak and surely it is not for less.

We are going to start at the beginning, although I am not going to give you the basic definitions, you can find those in google, let's go straight to the point...

## Access to OpenAI

- First thing you’ll need to do is to create an account on <a class="hover:no-underline text-blue underline" href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI</a>
- Then, go to the <a class="hover:no-underline text-blue underline" href="https://beta.openai.com/playground" target="_blank" rel="noreferrer">Playground</a>

Don’t worry to much about those settings on the right sidebar, they are important but not to much (for us), for now...

## What is a Prompt

A prompt is what you input to GPT-\*. It sounds like something really simple, but is not. In fact, it is rumored that in the future it could be a profession, writing prompts. This is due to several reasons:

- One of these is the **Temperature**, one of those parameters (hyperparameters) that I told you not to worry about. The temperature tells the model how much risk it should take when giving a response to a given prompt.

  A higher temperature (of 0.9) is better for more creative things. A lower temperature (of 0.1) is better for prompts where you expect a "right answer".

- The second is the well-known <a class="hover:no-underline text-blue underline" href="https://towardsdatascience.com/understanding-zero-shot-learning-making-ml-more-human-4653ac35ccab" target="_blank" rel="noreferrer">"zero-shot learning" (ZSL)</a>, <a class="hover:no-underline text-blue underline" href="https://medium.com/idatha-enterprise-experience-academic-s/hablemos-de-zero-shot-learning-db52bd558e7" target="_blank" rel="noreferrer">"zero-shot learning" (ZSL) in spanish</a> problem. In this case a model can correctly predict objects for a class of which it has never seen an example before.

  I am going to give you an example, what would happen if we showed the AI a photo of an animal that it had never seen? Will it be able to guess which animal it is? Let's say the animal is a zebra and also the AI has seen pictures of horses before. In turn, you have been told that zebras are similar to horses but with stripes. In this scenario, it is very likely that the AI will correctly deduce the name of the animal.

## Writing Prompts

Whenever we enter a poorly written or poorly detailed prompt to the AI, we are doing "zero-shot learning", basically we are waiting for the AI and its model to give us a good answer, but we gave it few or not very clear details.

Example I:

> Prompt: Tell me the name of a mammalian animal belonging to the family Equidae whose extremities have toes ending in hooves

Very surely the AI will tell us that it is a horse...

On the contrary, if we give many more details such as:

> Prompt: Tell me the name of a mammalian animal belonging to the family Equidae whose extremities have toes ending in hooves and that also along the neck it has a thick mane of erect hairs that crown its large ears

It is very possible that now the answer is Zebra, because this last characteristic is absolutely typical of these animals and not of horses.

Creating good prompts isn’t easy!

Example II:

> Tell me a story titled "Andrés and the Galactic War" set in the 2500s that feels like a sci-fi.

Very surely the AI will take the internet literature based on Star Wars or Star Trek to create a science fiction story

We can improve the prompt:

> Prompt: Tell me a full story with a beginning, middle, and end titled "Andrés and the Galactic War" set in the 2000s that feels like a real story. At the end of the story, include a crazy plot twist.

> Story: Andres is a software developer interested in astronomy from a very young age, Andrés is an intern at SpaceX, Andrés has been selected to test a prototype of a new rocket

I am completely sure that now the story will be very different. Because now GPT-\* has an example with more info.

Example III (for JavaScript Developers):

> Prompt: Based on this class, please implement the subtraction method and give me an example:

```js
class Calculator {
  constructor(num1, num2) {
    this.num1 = num1
    this.num2 = num2
  }

  add() {
    return this.num1 + this.num2
  }
}
```

We are giving the AI almost complete context of what it needs and an example.

## Conclusion

If you have access to the model's hyperparameters, remember to adjust the temperature to what you need.

You won't be the best at writing prompts unless you do it a lot, until you understand how GPT-3 (deep learning) works.
