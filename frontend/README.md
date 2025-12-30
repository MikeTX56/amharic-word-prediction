# Amharic Word Prediction Frontend

A modern, production-ready React frontend for the Amharic word prediction application.

## Features

- ⚛️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** for styling
- 🚀 **Vite** for fast development and building
- 🔐 **Authentication** with JWT
- 📊 **Dashboard** with statistics and history
- 🎯 **Real-time predictions** with confidence scores
- 📱 **Responsive design** (mobile, tablet, desktop)
- 🌙 **Dark mode support**
- ♿ **Accessibility features**
- 🔔 **Toast notifications**

## Quick Start

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, MainLayout
│   ├── common/          # Reusable UI components
│   ├── auth/            # Authentication components
│   └── prediction/      # Prediction-related components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── context/             # React context providers
├── services/            # API services
├── types/               # TypeScript type definitions
├── styles/              # Global styles
├── utils/               # Utility functions
├── App.tsx              # Main app component
└── index.tsx            # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **date-fns** - Date formatting

## Key Features

### Authentication
- Login and registration
- JWT token management
- Protected routes
- User profile management

### Predictions
- Real-time word predictions
- Confidence score visualization
- Prediction history
- Export history as CSV

### Dashboard
- User statistics
- Recent predictions
- Performance metrics
- Search and filter

### Admin Dashboard
- System statistics
- User management
- API analytics
- Model information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
