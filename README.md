# RAG Chatbot Frontend

A Next.js based web application that serves as the frontend interface for the RAG Chatbot system.

## Overview

This repository contains the frontend web application for the RAG (Retrieval-Augmented Generation) Chatbot. It provides a user-friendly interface to interact with the RAG Chatbot backend, allowing users to:

- Send queries to the chatbot
- View relevant context retrieved from the knowledge base
- See conversation history
- Configure and manage the chatbot settings

## Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm package manager
- A running instance of the [RAG Chatbot Backend](https://github.com/DeveloperMindset123/rag-chatbot-v1)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DeveloperMindset123/rag-chatbot-v1-frontend.git
cd rag-chatbot-v1-frontend
```

2. Install dependencies:

```bash
# Using npm
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000  # Adjust this to match your backend URL
```

## Running the Application

Start the development server:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev

# OR using pnpm
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Connecting to the Backend

**Important:** For full functionality, you must have the RAG Chatbot backend running. Please follow the setup instructions in the [backend repository](https://github.com/DeveloperMindset123/rag-chatbot-v1) before using this frontend.

The backend provides:

- ChromaDB vector storage
- FastAPI server
- LLM integration (Anthropic Claude and Google Gemini)
- Model Context Protocol (MCP) implementation

## Features

- **Conversational Interface**: Chat-like interface for interacting with the RAG chatbot
- **Context Visualization**: View the relevant context retrieved from the vector database
- **Query History**: Browse through previous conversations
- **Model Selection**: Choose between available language models (Claude or Gemini)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
rag-chatbot-v1-frontend/
├── app/                   # Next.js app router
│   ├── page.tsx           # Home page
│   ├── chat/              # Chat interface
│   ├── settings/          # Settings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── chat/              # Chat-related components
│   ├── ui/                # UI components
├── lib/                   # Utility functions
    ├──    ...             # Basic utillity functions
└── next.config.js         # Next.js configuration
```

## Development

### Recommended Extensions (VS Code)

- ESLint
- Prettier
- Tailwind CSS IntelliSense

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

This Next.js application can be deployed to various platforms:

- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Any platform supporting Node.js applications

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License

## Contact

dasa60196@gmail.com

## Related Projects

- [RAG Chatbot Backend](https://github.com/DeveloperMindset123/rag-chatbot-v1) - The backend service for this frontend
