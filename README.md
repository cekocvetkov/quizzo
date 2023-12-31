# Quizzo
An application for performing CRUD operations on quizzes.

**The main idea of this project was to play around with server side rendering and Next.js server actions.**

It doesn't use any css framework or additional fonts and utilizes a minimal set of custom css classes with minimalistic styles saved in a global stylesheet to emphasize simplicity and create focus on the main idea of the project.

### Data layer
Quizzos are saved in a SQLite database in order to simplify the data layer (Prisma is used as ORM). The focus on this project is mainly the Next.js Data Fetching and not the underlying persistence itself.

### Useful commands
#### Open Prisma studio GUI
`npx prisma studio`

#### Initializing the database (if needs to reset, delete migrations folder etc.)
`npx prisma migrate dev --name init`

#### Seeding the database (defined in package.json)
`npx prisma db seed`

## Insights
### Questions page (search for all available questions from all quizzos with pagination)
#### 1 variant: client side structure with server actions called from client components (/questions-client)
The questions-client page we call server actions from client components. The server actions are defined in a separate file and are called through `startTransition` from the `useTransition` hook.
The whole page functionality is build with client side style components and only the database calls are called on the server
#### 2 variant: client side structure with server actions called from client components



## Next.js Generated Documentation:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
