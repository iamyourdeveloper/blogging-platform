This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

If you do not know react then make your changes by modifying `temple/index.html`. You can use the Live server extension to view your edits live as you change them.

claim a task on asana. make a branch for it and start working.

## Instructions 
- Build a blogging platform with a team of at least 3 people. 
- Use Asana 
- Someone lead and give tasks to other team members

## Estimated Time To Complete 
- 1 Month if done by 2 people The more people that work on it the faster this project will get done

## Features 
- Landing Page 
- User Authentication - register, login, logout 
- Dashboard - Allow users to create, edit, delete blogs 
- Categories - posts can have one category 
- Tags - posts can have multiple tags 
- Responsive 
- Allow users to choose between 2 types of themes for their blog 
- Multiple Users can sign up and create their own blogs

## Routes should look like this 
- localhost:3000/ - platform home page 
- localhost:3000/login - user can login 
- localhost:3000/register - user can register 
- localhost:3000/user-name/ - homepage of user blog 
- localhost:3000/user-name/category-name - show all blog posts from that category 
- localhost:3000/user-name/category-name/article-slug - show single blog post 
- localhost:3000/user-name/tag/tag-name - show all the posts with that tag 
- localhost:3000/admin - dashboard after user logged in 
- GET localhost:3000/admin/posts - show all user posts 
- GET localhost:3000/admin/create - form to create post 
- POST localhost:3000/admin/create - handle Post creation 
- GET localhost:3000/admin/posts/{id}/edit - Form to edit post 
- UPDATE localhost:3000/admin/posts/{id} - handle edit post 
- DELETE localhost:3000/admin/posts/{id} - delete post

Resources Platform homepage - recreate something similar to this https://bulkit.cssninja.io/kit2-landing-6.html

Templates you can recreate for themes https://www.squarespace.com/templates/cruz-demo https://www.squarespace.com/templates/merida-demo

Don't waste time building the dashboard just use a template plenty of free ones here https://www.creative-tim.com/blog/web-design/free-dashboard-templates/

How to use ASANA as a team and breaking down the project use this video as an example ﻿

See less

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
