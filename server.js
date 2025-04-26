import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to handle SPA routing
app.use((req, res, next) => {
  // don't redirect API calls or actual files
  if (req.path.startsWith('/assets') || req.path.includes('.')) {
    return next();
  }
  console.log(`Redirecting ${req.path} to index.html for SPA routing`);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the app`);
}); 