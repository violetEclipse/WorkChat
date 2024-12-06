<?php
// upload_file.php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"])) {
    $file = $_FILES["file"];
    $upload_dir = "uploads/"; // Directory to store files

    // Check for upload errors
    if ($file["error"] == 0) {
        $file_name = basename($file["name"]);
        $file_path = $upload_dir . $file_name;

        // Move file to the uploads directory
        if (move_uploaded_file($file["tmp_name"], $file_path)) {
            echo "File uploaded successfully!";
        } else {
            echo "Error uploading file!";
        }
    } else {
        echo "Error: " . $file["error"];
    }
}
?>
