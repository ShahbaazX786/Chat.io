import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { connectDB } from './lib/db.js';
import { initializeSocket } from './lib/socket.js';
import messageRouter from './routes/messageRoutes.js';
import userRouter from './routes/userRoutes.js';

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
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => { console.log('Server is running on PORT:', PORT) });
}

// Exporting server so that vercel can take over and re-run it.
export default server;