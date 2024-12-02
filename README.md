This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## How you can view running app locally

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Where you can browse through the app

App is deployed on Vercel :)
You can find deployed app on address -> [Working Movie App](https://next-movies-app-six.vercel.app/)

## Quick Recap

The app is made with Next.js v15, Tailwind CSS with help of Local Storage also to delay the user inputs I used use-debounce package. Everything is typed with typescript.

I didn't want to create the images and in my eyes the easiest way was to use react-icons package.You can see a list of movies.

Then you are able to search for a specific movie that you like.
Each movie is clickable and it will take you to movie detail page where there are some more information about the movie.

Each movie you can add to your favorites. You can go to your favorites page by clicking the red heart in top right corner.
You can remove movies from favorites page if you got tired of them. On the bottom of page you can play around with pagination to list more surprising movies.

When you scrolled down so far and you don't want to scroll back up to the beginning you can either click on my name and reload the page again or click the arrow up button and
it will take you smoothly to the beginning of the website :)

## Info about environments variables

I almost forgot, here are the tokens that you need to have locally if you want to run the project locally.

API_URL="https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1"

NEXT_PUBLIC_API_URL="https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&page=1"

NEXT_PUBLIC_API_KEY=""//You need to create this yourself on their website

NEXT_IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500"
