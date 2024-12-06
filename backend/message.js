// message.js
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    // Send data to the server (e.g., using AJAX or fetch)
    fetch('send_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipient, message })
    })
    .then(response => response.json())
    .then(data => {
        alert('Message Sent Successfully');
        document.getElementById('recipient').value = '';
        document.getElementById('message').value = '';
    })
    .catch(error => {
        alert('Error sending message');
    });
});

function goBack() {
    window.history.back();
}

function openSettings() {
    window.location.href = 'settings.html'; // Update with actual settings page link
}
// settings.js or similar
function goBack() {
    window.history.back();
}

function goToHome() {
    window.location.href = 'home.html';
}
