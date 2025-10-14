import express from 'express';
import { getMessages, getUsersForSidebar, markMessageAsSeen } from '../controllers/messageController';
import protectedRoute from '../middleware/auth';

const messageRouter = express.Router();

messageRouter.get('/users', protectedRoute, getUsersForSidebar);
messageRouter.get('/:id', protectedRoute, getMessages);
messageRouter.put('mark/:id', protectedRoute, markMessageAsSeen);

export default messageRouter;