import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import path from 'path';
import { fileURLToPath } from 'url';
import ws from 'ws';

import cadRoutes from './routes/cad.routes.js';
import blockRoutes from './routes/block.route.js';

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

// WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Setup Express app
const app = express();

// Database setup
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });
await prisma.$connect();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://zero3-cad-project.onrender.com'],
    credentials: true,
  })
);

// Routes
app.use('/api/cad', cadRoutes);
app.use('/api/block', blockRoutes);

// Test route
app.get('/test', (req, res) => res.send('hello'));

// Serve frontend (after API routes!)
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ success: false, message, statusCode });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
