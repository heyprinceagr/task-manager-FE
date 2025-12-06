# Task Manager Frontend


This is the frontend for a full-stack Task Manager application. Built with Next.js, it provides a user-friendly interface for creating, organizing, and tracking tasks. The application features user authentication, task management with image uploads, and a responsive design styled with Tailwind CSS.

## Features

-   **User Authentication**: Secure sign-up and login functionality.
-   **Task Management (CRUD)**: Create, read, update, and delete tasks.
-   **Task Status Tracking**: Easily update task status (Pending, In-Process, Complete).
-   **Image Uploads**: Attach images to your tasks for better context.
-   **Protected Routes**: Secure access to task management pages for authenticated users only.
-   **Responsive Design**: A seamless experience across desktop and mobile devices.
-   **State Management**: Centralized state management using Redux Toolkit for authentication status.
-   **Form Handling**: Efficient and validated forms powered by React Hook Form.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/)
-   **Icons**: [@iconify/react](https://iconify.design/)
-   **Notifications**: [SweetAlert2](https://sweetalert2.github.io/)

## Prerequisites

-   Node.js (v18.x or later)
-   npm, yarn, or pnpm
-   A running instance of the [Task Manager Backend](https://github.com/heyprinceagr/task-manager-be)

## Getting Started

Follow these steps to get the development environment running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/heyprinceagr/task-manager-fe.git
cd task-manager-fe
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the URL for your backend API.

```.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Replace `http://localhost:8000` with the actual URL where your backend server is running.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can now sign up, log in, and start managing your tasks.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Runs the ESLint linter to check for code quality.
