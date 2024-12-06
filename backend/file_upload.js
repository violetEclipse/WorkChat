// file_upload.js
document.getElementById('fileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('File uploaded successfully');
        document.getElementById('file').value = '';
    })
    .catch(error => {
        alert('Error uploading file');
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
