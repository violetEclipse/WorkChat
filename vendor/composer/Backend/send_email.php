<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the Composer autoloader
require 'vendor/autoload.php';

// Database connection (if needed)
$host = 'localhost';
$dbname = 'workchat';
$username = 'root';
$password = ''; // Default for XAMPP
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email from the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Your email here
        $mail->Password = 'your-email-password'; // Your email password here or App password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('your-email@gmail.com', 'WorkChat');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Invitation to Join WorkChat';
        $mail->Body    = 'You have been invited to join WorkChat. Click the link below to sign up. <br><a href="http://yourdomain.com/register.html">Register Now</a>';

        // Send the email
        if ($mail->send()) {
            echo json_encode(['success' => true, 'message' => 'Invitation sent successfully!']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
}
?>
