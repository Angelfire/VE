import { ImageResponse } from '@vercel/og';

import fs from 'node:fs';
import path from 'node:path';

import { getCollection, type CollectionEntry } from 'astro:content';

import { getFormattedDate } from "@/lib"

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<'blog'> };
}
 
export async function GET({ props }: Props) {
  const { post } = props;

  const title = post.data.title ?? '';
  const pubDate = post.data.pubDate ?? '';

  const InterBold = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Bold.ttf'),
  );
  const InterRegular = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Regular.ttf'),
  );

  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'flex flex-col gap-2',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-blue-500',
                  style: {
                    fontSize: '75px',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    lineHeight: '1',
                    marginBottom: '0.2em',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-black',
                  style: {
                    fontSize: '25px',
                    fontFamily: 'Inter',
                    lineHeight: '1.4',
                    fontWeight: 400,
                  },
                  children: getFormattedDate({ date: pubDate }),
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[30px] bottom-[30px] flex gap-x-0.5 items-center text-3xl',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-black',
                  style: {
                    fontFamily: 'Inter',
                    fontWeight: 400,
                  },
                  children: 'Andrés B.',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-blue-500',
                  style: {
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    marginLeft: '0.5em',
                    marginRight: '0.5em',
                  },
                  children: '•',
                },
              },
              {
                type: 'div',
                props: {
                  tw: '',
                  style: {
                    backgroundImage: 'linear-gradient(90deg, #db2777, #2563eb)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                  },
                  children: 'velocidadescape.com',
                },
              },
            ],
          },
        }
      ],
      tw: 'w-full h-full flex flex-col relative p-15 bg-white',
      style: {
        fontFamily: 'Inter',
        color: 'rgba(255, 255, 255, 0.75)',
        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: InterRegular,
        style: 'normal',
        weight: 700,
      },
      {
        name: 'Inter',
        data: InterBold,
        style: 'normal',
        weight: 400,
      },
    ],
  });
}
 
// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}