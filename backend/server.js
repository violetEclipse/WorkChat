document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Fetch API Example
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').textContent = data.message;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('output').textContent = 'Failed to load data.';
        });

    // Register functionality
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.text())
            .then(message => alert(message))
            .catch(error => alert('Registration failed'));
    });

    // Login functionality
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.text())
            .then(message => alert(message))
            .catch(error => alert('Login failed'));
    });

    // Messaging functionality
    const sendMessageBtn = document.getElementById('send-message');
    sendMessageBtn.addEventListener('click', () => {
        const message = document.getElementById('chat-input').value;
        if (message) {
            socket.emit('message', message);
            document.getElementById('chat-input').value = '';
        }
    });

    socket.on('message', message => {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
    });

    // File Sharing functionality
    const fileForm = document.getElementById('file-upload-form');
    fileForm.addEventListener('submit', event => {
        event.preventDefault();
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        if (file) {
            const fileList = document.getElementById('file-list');
            const fileItem = document.createElement('li');
            fileItem.textContent = file.name;
            fileList.appendChild(fileItem);
        }
    });

    // Notifications
    const notificationList = document.getElementById('notification-list');
    function addNotification(text) {
        const notification = document.createElement('div');
        notification.textContent = text;
        notificationList.appendChild(notification);
    }

    // Admin Dashboard
    const sendAnnouncementBtn = document.getElementById('send-announcement');
    sendAnnouncementBtn.addEventListener('click', () => {
        const announcement = prompt('Enter your announcement:');
        if (announcement) {
            addNotification(`New Announcement: ${announcement}`);
            const announcementList = document.getElementById('announcement-list');
            const announcementItem = document.createElement('li');
            announcementItem.textContent = announcement;
            announcementList.appendChild(announcementItem);
        }
    });
});
