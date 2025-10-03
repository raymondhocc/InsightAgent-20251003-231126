# InsightAgent: AI E-Commerce Campaign Analyst

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/Insight-20250930-061156)

InsightAgent is a sophisticated, AI-driven web application designed for e-commerce marketing professionals. It provides a conversational interface to an AI analyst that can analyze historical campaign data and simulate future campaign outcomes. The application features a minimalist, dual-panel layout. A persistent sidebar allows for managing different analysis sessions (e.g., 'Q4 Holiday Push', 'Summer Sale Simulation'), while the main panel hosts the interactive chat.

Users can describe a past campaign to get performance insights or propose a future campaign. The AI can then prompt for specific parameters—such as budget, channel mix (e.g., Instagram, Google Ads, Email), and promotional mechanics (% discount, BOGO)—through interactive forms within the chat. Upon receiving the parameters, the AI 'simulates' the campaign, presenting its predictions not just as text, but through clear, elegant data visualizations like charts and stat cards, showing projected ROI, sales lift, and other key metrics. This allows marketers to make data-informed decisions, optimizing their strategies before launch.

## Key Features

-   **Conversational AI Interface:** Interact with an AI analyst in a natural, chat-based environment.
-   **Campaign Performance Analysis:** Get insights on historical campaigns by describing them to the agent.
-   **Future Campaign Simulation:** Propose new campaigns and receive data-driven projections on key metrics like ROI and sales lift.
-   **Interactive Parameter Forms:** The AI prompts for campaign details (budget, channels, promotions) through intuitive forms within the chat.
-   **Rich Data Visualization:** Simulation results are presented with elegant charts and stat cards using Recharts.
-   **Session Management:** Create, manage, and switch between multiple analysis sessions seamlessly.
-   **Minimalist & Responsive UI:** A clean, dual-panel layout that is fully responsive and visually polished.

## Technology Stack

-   **Frontend:** React, Vite, TypeScript
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Animation:** Framer Motion
-   **State Management:** Zustand
-   **Data Visualization:** Recharts
-   **Backend:** Cloudflare Workers, Hono
-   **Stateful AI:** Cloudflare Agents (Durable Objects)
-   **AI Integration:** Cloudflare AI Gateway, OpenAI SDK

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/insight-agent.git
    cd insight-agent
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Environment Variables

The application requires Cloudflare AI Gateway credentials to function.

1.  Create a `.dev.vars` file in the root of the project:
    ```bash
    touch .dev.vars
    ```

2.  Add your Cloudflare AI Gateway URL and API Key to the `.dev.vars` file. These are managed securely as secrets in production.
    ```ini
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_NAME/openai"
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"
    ```

## Development

To start the local development server, which includes the Vite frontend and the Cloudflare Worker, run:

```bash
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will automatically reload as you make changes to the source files.

## Usage

-   Upon launching the application, you will be greeted with a clean interface.
-   Click "Start New Analysis" to create a new chat session.
-   Type a request in the input box, such as "Simulate a new campaign for our summer sale."
-   The AI will respond and may present a form to collect details like budget, promotion type, and channel mix.
-   Fill out the form and submit it.
-   The AI will process the information and return its analysis, including visual charts and key metrics.
-   You can continue the conversation to refine the simulation or ask further questions.
-   Your sessions are saved in the sidebar, allowing you to switch between different analyses.

## Important Note on AI Capabilities

This project is configured to use Cloudflare's AI Gateway. For the AI features to work, you must deploy it yourself and configure the necessary API keys as secrets in your Cloudflare account. The local development environment uses the `.dev.vars` file, but for a deployed application, you must set these secrets in your Worker's settings.

## Deployment

This project is designed for easy deployment to Cloudflare Pages.

1.  **Build the project:**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    The `deploy` script in `package.json` handles both the build and deployment process.
    ```bash
    bun run deploy
    ```

This command will use Wrangler to build and deploy your application to the Cloudflare network.

Alternatively, you can connect your GitHub repository to Cloudflare Pages for continuous deployment.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/Insight-20250930-061156)