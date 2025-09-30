# Urban Chowk - Culinary Collective

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/qasimbilalstack/generated-app-20250930-060957)

> A visually stunning digital menu platform for the Urban Chowk food court, featuring stall discovery and easy menu management.

Urban Chowk is a visually stunning, modern web application designed to be the digital gateway to a vibrant food court. It provides a beautiful and intuitive interface for customers to explore various food stalls, browse their menus, and discover new culinary delights. The platform also features a simple yet powerful interface for stall owners to manage their stalls and menu items in real-time. The application is built for performance and aesthetic excellence, running on Cloudflare's edge network to ensure a fast, seamless experience for all users.

## ✨ Key Features

-   **Stunning Visuals:** A clean, modern, and appetizing design that makes browsing a delight.
-   **Stall Discovery:** An interactive grid of all available food stalls.
-   **Detailed Menus:** Beautifully displayed menus for each stall, categorized for easy browsing.
-   **Responsive Perfection:** Flawless layouts across all device sizes, from mobile to desktop.
-   **Built for Performance:** Runs on Cloudflare's edge network for a fast, seamless experience.
-   **Future-Ready:** Designed with an Admin Dashboard in mind for easy content management.

## 🚀 Technology Stack

-   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/)
-   **Backend:** [Hono](https://hono.dev/) on [Cloudflare Workers](https://workers.cloudflare.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
-   **State Management:** [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/), [Zustand](https://zustand-demo.pmnd.rs/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Schema Validation:** [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/urban_chowk_menu.git
    cd urban_chowk_menu
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```

3.  **Run the development server:**
    This command starts the Vite frontend and the Wrangler server for the backend worker simultaneously.
    ```bash
    bun dev
    ```

    The application should now be running on `http://localhost:3000`.

## 🛠️ Available Scripts

-   `bun dev`: Starts the local development server.
-   `bun build`: Builds the frontend application for production.
-   `bun lint`: Lints the codebase using ESLint.
-   `bun deploy`: Deploys the application to Cloudflare Workers.

## 📂 Project Structure

The project is organized into three main directories:

-   `src/`: Contains the entire React frontend application, including pages, components, hooks, and styles.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers, including routes and entity definitions.
-   `shared/`: Contains TypeScript types and mock data that are shared between the frontend and backend to ensure type safety.

## ☁️ Deployment

This application is designed to be deployed on the Cloudflare network.

1.  **Log in to Wrangler:**
    Authenticate the Wrangler CLI with your Cloudflare account.
    ```bash
    wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script. This will build the application and deploy it to your Cloudflare account.
    ```bash
    bun deploy
    ```

    Alternatively, you can deploy directly from your GitHub repository with a single click.

    [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/qasimbilalstack/generated-app-20250930-060957)