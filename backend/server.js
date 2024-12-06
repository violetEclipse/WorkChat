const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Client connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Notify all clients about a new connection
    io.emit('notification', `User ${socket.id} joined the chat.`);

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        io.emit('chat message', { sender: socket.id, message: msg }); // Broadcast message
    });

    // Handle file uploads (example placeholder)
    socket.on('file upload', (fileInfo) => {
        console.log(`File received from ${socket.id}: ${fileInfo.name}`);
        io.emit('file upload', { sender: socket.id, fileName: fileInfo.name });
    });

    // Notify when a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        io.emit('notification', `User ${socket.id} left the chat.`);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
