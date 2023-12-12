---
title: "Styling markdown posts with Tailwind CSS in GatsbyJS"
slug: "css/styling-markdown-tailwind-gatsby"
pubDate: "2020-07-14"
description: "Styling markdown posts with Tailwind CSS in GatsbyJS"
author: "Andres Bedoya"
tags: ["CSS", "TailwindCSS"]
---

When I decided to create this blog, I was very clear that I wanted to do it in the easiest way possible, I didn't want to have to deal with databases, CMS, etc.

I had already seen some other blogs and knew that it was possible to create them using markdown to write a full post. I also didn't want to deal with CSS, so I looked for <a class="hover:no-underline text-blue underline" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a> as an option. Also I wanted to have my syntax highlighting in my posts, so, I found <a class="hover:no-underline text-blue underline" href="https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/" target="_blank" rel="noreferrer">gatsby-remark-prismjs</a>. 

Working with Tailwind CSS it's increible, but here I found my first big challenge, how can I add styles to my markdown if I can't add styles to my HTML elements?

A little more context, when you want to add styles to an specific element you should do something like:
```
<span className="border-solid border-2 border-black font-extrabold h-16 inline-flex items-center justify-center mr-4 rounded-full text-center w-16">VE</span>
```

But, again, how can I do that in markdown without HTML? well, I found <a class="hover:no-underline text-blue underline" href="https://www.gatsbyjs.org/packages/gatsby-remark-classes/" target="_blank" rel="noreferrer">gatsby-remark-classes</a> basically, automatically add class attributes to markdown elements. In your `gatsby-config.js` you need to do something like:
```js
{
  resolve: `gatsby-remark-classes`,
  options: {
    classMap: {
      link: "bg-yellow hover:bg-transparent hover:text-black hover:underline",
      paragraph: "font-text mb-6",
    }
  },
},
```

Tailwind CSS in their latest versions uses `PurgeCSS` (a tool to remove unused CSS) and it's incredible aggressive; and for some reason, all the styles that were being applied at markdown, were being ignored, I mean, styles were being applied, but Tailwind was purging these classes (not including them). After many hours looking in Google, I found a post with a <a class="hover:no-underline text-blue underline" href="https://tjaddison.com/blog/2019/08/styling-markdown-tailwind-gatsby/" target="_blank" rel="noreferrer"><em>tricky</em> solution</a>. I tried it, it worked, but I didn't like it...

With Tailwind CSS you have a <a class="hover:no-underline text-blue underline" href="https://tailwindcss.com/docs/installation#3-create-your-tailwind-config-file-optional" target="_blank" rel="noreferrer">config file</a> `tailwind.config.js`, this is something optional, but extremely powerful. In this file you can add some config for PurgeCSS, and one of options allows you to **whitelist selectors to stop PurgeCSS from removing them from your CSS**. BING BING BING! 
```js
purge: {
  options: {
    whitelist: [
      'mx-8',
      'my-6',
      'pl-4',
    ]
  },
},
```

This solution worked perfect!
