import { Server } from "socket.io";

// store online users;
let io;
const userSocketMap = {};

const initializeSocket = (server) => {
    // Initialize Socket.io server
    io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

    // socket.io connection Handler
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        console.log('User Connecteed', userId);

        if (userId) userSocketMap[userId] = socket.id;

        // Emit online users to all connected clients
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('User Disconnected', userId);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap))
        });
    });
}

const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized yet!');
    return io;
}

const getUserSocketMap = () => userSocketMap;

export { getIO, getUserSocketMap, initializeSocket };
