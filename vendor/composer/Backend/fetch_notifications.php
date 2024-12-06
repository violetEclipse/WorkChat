<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$message = $data['message'];

$query = "INSERT INTO notifications (user_id, message) VALUES (:user_id, :message)";
$stmt = $pdo->prepare($query);

if ($stmt->execute([':user_id' => $user_id, ':message' => $message])) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Notification sending failed']);
}
?>
