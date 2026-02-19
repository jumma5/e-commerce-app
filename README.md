# Tuh Clothing E-commerce Store Project

![Project Logo or Screenshot](https://via.placeholder.com/1200x600/f8f8f8/000000?text=Tuh+Clothing+E-commerce)

## Overview

A comprehensive e-commerce web application built using Next.js 14 (App Router) and React. The project aims to provide a seamless and efficient shopping experience for users, focusing on optimal performance and an attractive user interface. The application features Server-Side Data Fetching to improve Largest Contentful Paint (LCP) performance, state management with Redux Toolkit, and a modern, responsive design using Tailwind CSS and Radix UI, complemented by elegant animations powered by Framer Motion.

## Features

*   **Modern & Responsive UI:** An engaging design that works efficiently across all devices (desktop, tablets, smartphones).
*   **Server-Side Data Fetching (SSR):** To enhance performance and reduce initial page load time, especially for LCP.
*   **Centralized State Management:** Utilizing Redux Toolkit for the shopping cart and authentication state.
*   **User Authentication System:** Login, registration, and session management.
*   **Shopping Cart:** Add products, adjust quantities, and remove items.
*   **Product Pages:** Detailed views of products, images, and descriptions.
*   **Product Categorization:** Browse products by categories.
*   **Image Optimization:** Leveraging `next/image` for lazy loading and automatic image optimization.
*   **Light and Dark Mode Support:** Integrated with `next-themes`.
*   **Multi-language Support (i18n):** Includes support for Arabic and English.
*   **Smooth Animations:** Powered by Framer Motion for a dynamic user experience.
*   **Logout Confirmation:** To ensure a better user experience and prevent accidental logouts.

## Technologies Used

The project is built on a robust and modern tech stack:

*   **[Next.js 14](https://nextjs.org/) (App Router):** React framework for building web applications, with a focus on SSR and SSG.
*   **[React 19](https://react.dev/):** The core UI library.
*   **[TypeScript](https://www.typescriptlang.org/):** Adds static typing to improve code quality and maintainability.
*   **[Redux Toolkit](https://redux-toolkit.js.org/):** For efficient global state management.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid and responsive UI development.
*   **[Radix UI](https://www.radix-ui.com/):** Headless UI components for building custom design systems.
*   **[Framer Motion](https://www.framer.com/motion/):** A powerful animation library for React.
*   **[Zod](https://zod.dev/):** For schema validation.
*   **[React Hook Form](https://react-hook-form.com/):** For efficient form management.
*   **[Lucide React](https://lucide.dev/):** An icon library.
*   **[Sonner](https://sonner.emilkowalski.app/):** For beautiful and customizable toast notifications.
*   **[pnpm](https://pnpm.io/):** The package manager used in this project.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/) (version 18 or higher)
*   [pnpm](https://pnpm.io/installation) (can be installed via `npm install -g pnpm`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd tuh-clothing-e-commerce-app-main
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Development Server

To run the application in development mode:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000` (or another available port).

## Project Structure

An overview of the most important folders and files in the project:

```
. 
├── public/                   # Static assets (images, icons)
├── src/
│   ├── app/                  # Next.js routes and Layouts (e.g., RootLayout, Home Page)
│   │   ├── (auth)/           # Authentication routes (login, register)
│   │   ├── api/              # API endpoints (if any)
│   │   ├── checkout/         # Checkout page
│   │   ├── login/            # Login page
│   │   ├── product/[id]/     # Product detail page
│   │   ├── shop/             # Shop page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout of the application
│   │   └── page.tsx          # Home page (Server Component for data fetching)
│   ├── components/           # Reusable React components
│   │   ├── ui/               # Basic UI components (shadcn/ui based)
│   │   ├── cart-drawer.tsx   # Cart drawer component
│   │   ├── featured-products.tsx # Featured products section
│   │   ├── footer.tsx        # Footer component
│   │   ├── hero-section.tsx  # Hero section for the home page
│   │   ├── navbar.tsx        # Top navigation bar
│   │   └── product-card.tsx  # Single product card component
│   ├── hooks/                # Custom React Hooks
│   │   ├── use-auth.tsx      # Authentication hook
│   │   ├── use-locale.tsx    # Language management hook
│   │   └── use-toast.ts      # Toast notification hook
│   ├── lib/                  # Utility files and data types
│   │   ├── i18n.ts           # Internationalization file
│   │   ├── types.ts          # TypeScript type definitions
│   │   └── utils.ts          # General utility functions
│   └── store/                # State management using Redux Toolkit
│       ├── cart-slice.ts     # Redux slice for the shopping cart
│       ├── hooks.ts          # Custom Redux hooks
│       └── index.ts          # Redux Store configuration
├── .gitignore                # Files and folders to be ignored by Git
├── next.config.mjs           # Next.js configuration
├── package.json              # Project information and dependencies
├── pnpm-lock.yaml            # pnpm lockfile
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Ensure the code passes tests (if any) and adheres to style guidelines.
5.  Submit a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Note:** Replace `<YOUR_REPOSITORY_URL>` with your actual repository URL and the placeholder image link with a real project image or logo.