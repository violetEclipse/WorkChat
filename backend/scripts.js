// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Handle form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);

    // message.js
document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('message', message);

    // Make the AJAX request to send_message.php
    fetch('send_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display server response (message sent or error)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


    // Option buttons
    document.getElementById('messaging-button').addEventListener('click', function () {
        showSection('messaging-section');
    });
    document.getElementById('file-sharing-button').addEventListener('click', function () {
        showSection('file-sharing-section');
    });
    document.getElementById('admin-dashboard-button').addEventListener('click', function () {
        showSection('admin-dashboard-section');
    });
    document.getElementById('settings-button').addEventListener('click', function () {
        showSection('settings-section');
    });
    document.getElementById('invite-colleagues-button').addEventListener('click', function () {
        showSection('invite-colleagues-section');
    });
    document.getElementById('notifications-button').addEventListener('click', function () {
        showSection('notifications-section');
    });

    // Back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            showSection('options-page');
        });
    });

    // Sending messages
    document.getElementById('send-message').addEventListener('click', function () {
        const chatInput = document.getElementById('chat-input');
        const chatBox = document.getElementById('chat-box');
        if (chatInput.value.trim() !== '') {
            const newMessage = document.createElement('div');
            newMessage.textContent = chatInput.value;
            chatBox.appendChild(newMessage);
            chatInput.value = '';
        }
    });

    // Invite Colleagues form handling
    document.getElementById('invite-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        if (email) {
            // Implement your invitation logic here
            // For now, just log the invitation to the console
            console.log(`Inviting: ${email}`);
            emailInput.value = '';
        }
    });

    // Apply customization changes
    document.getElementById('apply-color').addEventListener('click', applyCustomization);
    document.getElementById('apply-font-style').addEventListener('click', applyCustomization);
    document.getElementById('apply-font-size').addEventListener('click', applyCustomization);
    document.getElementById('upload-profile-picture').addEventListener('click', applyCustomization);
});

// Function to handle login and registration
function handleLogin(event) {
    event.preventDefault();
    // Implement your login logic here
    // If successful, show the options page
    showSection('options-page');
}

function handleRegister(event) {
    event.preventDefault();
    // Implement your registration logic here
    // If successful, show the options page
    showSection('options-page');
}

// Function to show a specific section
function showSection(sectionId) {
    document.querySelectorAll('#app > div').forEach(function (div) {
        div.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Function to apply customization changes
function applyCustomization() {
    const color = document.getElementById('color-select').value;
    document.body.style.backgroundColor = color;

    const fontStyle = document.getElementById('font-style').value;
    document.body.style.fontFamily = fontStyle;

    const fontSize = document.getElementById('font-size').value;
    document.body.style.fontSize = `${fontSize}px`;

    // Handle profile picture upload (not fully implemented)
    const profilePicture = document.getElementById('profile-picture').files[0];
    if (profilePicture) {
        console.log(`Profile picture selected: ${profilePicture.name}`);
        // Add code to handle profile picture upload
    }
}
// settings.js or similar
function goBack() {
    window.history.back();
}

function goToHome() {
    window.location.href = 'home.html';
}
// scripts.js
function navigateTo(page) {
    window.location.href = page;
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Send login request (AJAX or Fetch API)
    fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Login Successful!');
                navigateTo('index.html');
            } else {
                alert('Login Failed');
            }
        });
}
