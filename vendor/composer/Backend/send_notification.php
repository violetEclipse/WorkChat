<?php
// send_notification.php
include('db.php');

// Get data from POST request
$data = json_decode(file_get_contents('php://input'));
$title = $data->title;
$message = $data->message;
$userId = $data->userId; // admin's user ID

// Insert notification into the database
$query = "INSERT INTO notifications (title, message, user_id, timestamp) VALUES (:title, :message, :userId, NOW())";
$stmt = $conn->prepare($query);
$stmt->bindParam(':title', $title, PDO::PARAM_STR);
$stmt->bindParam(':message', $message, PDO::PARAM_STR);
$stmt->bindParam(':userId', $userId, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
