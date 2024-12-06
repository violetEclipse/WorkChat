<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

$query = "SELECT * FROM messages WHERE recipient_id = :user_id ORDER BY timestamp DESC";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['messages' => $messages]);
?>
