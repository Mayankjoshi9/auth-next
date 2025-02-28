# Auth-Next Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes authentication functionality and is configured with Tailwind CSS for styling.

## Functionality

- User authentication (login, registration)
- Protected routes
- API routes for authentication and user management
- MongoDB integration for storing user data

## Getting Started

### Prerequisites

- Node.js
- npm, yarn, pnpm, or bun
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/auth-next.git
cd auth-next
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_mongodb_connection_string
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### Running the Development Server

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd backend
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The backend server will run on [http://localhost:4000](http://localhost:4000).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
