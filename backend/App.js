document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Make the AJAX request to login.php
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display server response (success or failure)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// Send Message Function
function sendMessage() {
    const message = document.getElementById('chat-input').value;
    const sender_id = 1; // Example sender_id
    const recipient_id = 2; // Example recipient_id

    fetch('backend/send_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender_id, recipient_id, content: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Message sent!');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error sending message:', error));
}

// Send Email Invite Function
function sendEmailInvite() {
    const email = document.getElementById('email').value;

    fetch('backend/send_email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email invite sent!');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error sending email invite:', error));
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Make the AJAX request to login.php
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display server response (success or failure)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
