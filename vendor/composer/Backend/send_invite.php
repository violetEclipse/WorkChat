<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer (Ensure you have installed PHPMailer via Composer)
require 'vendor/autoload.php';

header('Content-Type: text/plain'); // Set content type to plain text for responses

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Use Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Your email
        $mail->Password = 'your-email-password'; // Your email password or app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email headers and content
        $mail->setFrom('your-email@gmail.com', 'WorkChat'); // Update sender details
        $mail->addAddress($email); // Recipient's email
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Invitation to Join WorkChat';
        $mail->Body = '
            <h1>WorkChat Invitation</h1>
            <p>You have been invited to join WorkChat. Please click the link below to register:</p>
            <a href="http://localhost/myProject/register.html">Register Now</a>
        ';

        // Send email
        $mail->send();
        echo "Invitation sent successfully!";
    } catch (Exception $e) {
        echo "Failed to send invitation. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}
?>