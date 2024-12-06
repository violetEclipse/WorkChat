// notifications.js

// Function to display notifications on the page
function displayNotifications(notifications) {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = ''; // Clear current notifications

    if (notifications.length === 0) {
        notificationList.innerHTML = '<p>No new notifications.</p>';
    } else {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification-item');
            notificationItem.innerHTML = `
                <p><strong>${notification.title}</strong></p>
                <p>${notification.message}</p>
                <small>${notification.timestamp}</small>
            `;
            notificationList.appendChild(notificationItem);
        });
    }
}

// Function to fetch notifications for the logged-in user
function fetchNotifications() {
    const userId = getUserId(); // This should be based on the logged-in user's session or token

    fetch('fetch_notifications.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayNotifications(data.notifications);
        } else {
            alert('Error fetching notifications');
        }
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
    });
}

// Function to send a notification (for admins to send notifications to users)
function sendNotification() {
    const notificationTitle = document.getElementById('notification-title').value;
    const notificationMessage = document.getElementById('notification-message').value;
    const userId = getUserId(); // Assuming the logged-in user is an admin and has the right to send notifications

    const notificationData = {
        title: notificationTitle,
        message: notificationMessage,
        userId: userId,
    };

    fetch('send_notification.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Notification sent successfully');
            // Optionally, clear the form
            document.getElementById('notification-title').value = '';
            document.getElementById('notification-message').value = '';
        } else {
            alert('Error sending notification');
        }
    })
    .catch(error => {
        console.error('Error sending notification:', error);
    });
}

// A simple function to simulate getting the current user's ID (you can replace it with actual logic)
function getUserId() {
    // For demo purposes, assuming the user ID is stored in localStorage after login
    return localStorage.getItem('userId');
}

// Fetch notifications when the page loads
document.addEventListener('DOMContentLoaded', fetchNotifications);
