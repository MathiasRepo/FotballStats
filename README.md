# FFKStats

A football statistics application built with React, Vite, and Tailwind CSS that uses the Football-Data.org API.

## Features

- View team information
- See upcoming fixtures
- Check recent match results
- Dark/light theme support
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Football-Data.org API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your API key:
   ```
   VITE_API_BASE_URL=https://api.football-data.org/v4
   VITE_API_KEY=your_api_key_here
   VITE_TEAM_ID=2481  # Default is Fredrikstad FK
   ```

### Development

Run the development server:
```
npm run dev
```

The application includes a built-in proxy to handle CORS issues with the Football-Data.org API. The proxy is configured in the `vite.config.js` file and will automatically route API requests through it.

### Running with Express Server (Alternative)

For production or if you encounter CORS issues with the Vite proxy, you can use the Express server:

1. Start the Express server:
```
node server.js
```

2. In a separate terminal, run the Vite development server:
```
npm run dev
```

### Build

Create a production build:
```
npm run build
```

## Handling CORS Issues

This project uses two approaches to handle CORS issues with the Football-Data.org API:

1. **Vite Development Proxy**: When running in development mode, API requests are proxied through Vite's built-in proxy server.

2. **Express Server Proxy**: An Express server (`server.js`) is included for production use or as an alternative to the Vite proxy. This server proxies requests to the Football-Data.org API and adds the necessary authentication headers.

The API service (`src/services/api.js`) is configured to use the proxy by default, which can be toggled by changing the `USE_PROXY` constant.

## Project Structure

- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks
- `src/services`: API service functions
- `src/pages`: Application pages
- `src/lib`: Utility functions
- `src/assets`: Static assets

## Technologies

- React
- Vite
- Tailwind CSS
- shadcn UI components
- Axios for API requests
- React Router for navigation

## License

MIT
