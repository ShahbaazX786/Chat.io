import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { connectDB } from './lib/db.js';
import messageRouter from './routes/messageRoutes.js';
import userRouter from './routes/userRoutes.js';
import { initializeSocket } from './lib/socket.js'

// Server 
const app = express();
const server = http.createServer(app);
initializeSocket(server);

// Middleware
app.use(express.json({ limit: '4mb' }))
app.use(cors());

// Routes
app.use('/api/status', (_req, res) => res.send('Server is up and running'));
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

// DB Connection
await connectDB();

// Server Listening
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log('Server is running on PORT:', PORT) });