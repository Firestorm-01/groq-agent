# Groq Agent UI

A ready-to-run cool interface with Groq API integration. Experience fast, intelligent AI conversations powered by Groq's ultra-fast inference.

## Overview

Groq Agent is a modern web interface built with React and Vite that leverages the Groq API for lightning-fast AI-powered conversations. This project provides a clean, user-friendly UI for interacting with advanced language models.

## Features

- ⚡ **Ultra-Fast Inference** - Powered by Groq's cutting-edge API
- 🎨 **Modern UI** - Built with React for a smooth user experience
- 🚀 **Quick Setup** - Get up and running in minutes with Vite
- 💬 **AI Conversations** - Engage with advanced language models seamlessly

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: JavaScript (88.7%) | CSS (6.6%) | HTML (4.7%)
- **API**: Groq API

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Initialize the project:**
   ```bash
   npm init vite@latest groq-agent-ui --template react
   ```

2. **Navigate to the project:**
   ```bash
   cd groq-agent-ui
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create/Add App Files:**
   - Ensure `app.jsx` is created and configured
   - Update your `index.html` file as needed

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Configuration

Before running the application, configure your Groq API:

1. Get your API key from [Groq Console](https://console.groq.com)
2. Create a `.env.local` file in the project root:
   ```env
   VITE_GROQ_API_KEY=your_api_key_here
   ```
3. Update your API configuration in the app

## Usage

Once the development server is running:

1. Start typing your messages in the chat interface
2. The AI will respond using Groq's advanced models
3. Enjoy ultra-fast inference speeds!

## Project Structure

```
groq-agent-ui/
├── src/
│   ├── app.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── ...
├── index.html            # HTML template
├── package.json
└── vite.config.js        # Vite configuration
```

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is open source. Check the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Powered by Groq** - Experience the future of AI inference
