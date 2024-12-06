// email_invite.js
document.getElementById('emailInviteForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form default submission

    const email = document.getElementById('email').value;

    // Send data to the server using fetch
    fetch('backend/send_invite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) // Send email as JSON
    })
        .then(response => response.text()) // Get server response as text
        .then(data => {
            alert(data); // Alert user with the server's response
            document.getElementById('email').value = ''; // Clear the input field
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending invitation. Please try again.');
        });
});

// Navigate back to the previous page
function goBack() {
    window.history.back();
}

// Open the settings page
function openSettings() {
    window.location.href = 'settings.html'; // Update this if the settings page has a different link
}
// email_invite.js
document.getElementById('emailInviteForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;

    // Send data to the server using fetch
    fetch('backend/send_invite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) // Send email as JSON payload
    })
        .then(response => response.text()) // Get the server response as plain text
        .then(data => {
            alert(data); // Show the response message from the server
            document.getElementById('email').value = ''; // Clear the input field
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending the invitation. Please try again.');
        });
});
