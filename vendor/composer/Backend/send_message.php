<?php
// send_message.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipient = $_POST["recipient"];
    $message = $_POST["message"];

    // Database connection (MySQL)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "myapp_db";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert the message into the database
    $sql = "INSERT INTO messages (recipient, message) VALUES ('$recipient', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
