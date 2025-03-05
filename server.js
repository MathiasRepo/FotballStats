import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Initialize dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Read API key from .env file directly if needed
let apiKey = process.env.VITE_API_KEY;
if (!apiKey) {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const apiKeyMatch = envFile.match(/VITE_API_KEY=([^\r\n]+)/);
    if (apiKeyMatch && apiKeyMatch[1]) {
      apiKey = apiKeyMatch[1];
      console.log('API key loaded from .env file');
    }
  } catch (err) {
    console.error('Error reading .env file:', err);
  }
}

console.log('API Key status:', apiKey ? 'API key is set' : 'API key is missing');

// Enable CORS for all routes
app.use(cors());

// API proxy endpoint
app.get('/api/*', async (req, res) => {
  try {
    const apiPath = req.path.replace('/api', '');
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const apiUrl = `https://api.football-data.org/v4${apiPath}${queryString}`;
    
    console.log(`Proxying request to: ${apiUrl}`);
    console.log(`Using API key: ${apiKey ? apiKey.substring(0, 5) + '...' : 'API key is missing'}`);
    
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Auth-Token': apiKey
      }
    });
    
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    res.json(response.data);
  } catch (error) {
    console.error('API proxy error:', error.message);
    
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      console.error('Error data:', error.response.data);
      
      res.status(error.response.status).json({
        error: error.message,
        details: error.response.data
      });
    } else if (error.request) {
      console.error('No response received');
      res.status(500).json({ error: 'No response received from API' });
    } else {
      console.error('Request setup error');
      res.status(500).json({ error: error.message });
    }
  }
});

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
