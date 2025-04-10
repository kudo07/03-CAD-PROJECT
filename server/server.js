import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import cadRoutes from './routes/cad.routes.js';
import blockRoutes from './routes/block.route.js';
import path from 'path';
import ws from 'ws';
//
dotenv.config();
const app = express();
// websocket constructor for neon
neonConfig.webSocketConstructor = ws;
// Database connection string
const connectionString = process.env.DATABASE_URL;

// Set up the pool with Neon and PrismaNeon adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Initialize Prisma Client with the Neon adapter
const prisma = new PrismaClient({ adapter });
prisma.$connect();
//MIDDLEWARE

app.use(express.json());
app.use(urlencoded({ extended: false }));
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
//

// test
app.get('/test', (req, res) => {
  res.send('hellp');
});
// ROUTES
app.use('/api/cad', cadRoutes);
app.use('/api/block', blockRoutes);
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
// server
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverr is running on port ${PORT}`);
});
