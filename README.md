# simplenotes
A therapy note generator powered by DeepSeek.

# SimpleNotes: Therapy Note Assistant

![SimpleNotes Logo](./public/therapy-icon.png)

## Overview

SimpleNotes is an AI-powered application that streamlines the creation of clinical therapy notes using the DAP (Data, Assessment, Plan) format. Built for mental health professionals, it reduces documentation time significantly, enabling therapists to focus more on patient care. Simply enter some basic info and submit your session notes, and get a professional note in less than 2 minutes.

## 🌟 Key Features

- **AI-Powered Note Generation**: Transform shorthand session notes into professional DAP-format clinical documentation
- **Customizable Templates**: Pre-built templates for initial assessments, follow-ups, crisis interventions, and discharge summaries
- **Digital Signature Capture**: Built-in signature pad with certification
- **PDF Generation**: One-click creation of professional clinical notes as downloadable PDFs
- **Privacy-First Design**: No server-side storage of any client information (HIPAA-aligned)
- **Step-by-Step Workflow**: Guided process from client information to completed note

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- A DeepSeek API key (optional, app works in mock mode without one)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/therapy-note-assistant.git
   cd therapy-note-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your DeepSeek API key:
   ```
   VITE_DEEPSEEK_API_KEY=your_api_key_here
   VITE_DEEPSEEK_API_ENDPOINT=https://api.deepseek.com/v1/chat/completions
   VITE_DEEPSEEK_MODEL=deepseek-chat
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5500`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🔧 Configuration

The application can be configured through the `config.js` file:

- `DEEPSEEK_API_KEY`: Your DeepSeek API key
- `DEEPSEEK_API_ENDPOINT`: The API endpoint for DeepSeek
- `DEEPSEEK_MODEL`: The model to use for note generation
- `isMockData`: Automatically set to true if no API key is provided
