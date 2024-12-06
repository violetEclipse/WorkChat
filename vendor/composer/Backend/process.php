<?php
// process.php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to send messages.";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipient = $_POST['recipient'];
    $message = $_POST['message'];

    // Validate input
    if (empty($recipient) || empty($message)) {
        echo "Recipient and message cannot be empty.";
        exit();
    }

    // Database connection
    $servername = "localhost";
    $username = "root"; // your MySQL username
    $password_db = ""; // your MySQL password
    $dbname = "myapp_db";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert message into the database
    $user_id = $_SESSION['user_id']; // Get logged-in user's ID

    $sql = "INSERT INTO messages (user_id, recipient, message) VALUES ('$user_id', '$recipient', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>

<!-- HTML Form for Message Submission -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Message</title>
</head>
<body>
    <h2>Send a Message</h2>

    <form method="POST" action="process.php">
        <label for="recipient">Recipient:</label>
        <input type="text" id="recipient" name="recipient" required><br><br>

        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea><br><br>

        <button type="submit">Send Message</button>
    </form>
</body>
</html>
