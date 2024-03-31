<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['text'];

    $to = "vinaypudi1332.com"; // Change this to your email address
    $subject = "New message from $name";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message: $message";

    // Send email
    if (mail($to, $subject, $body)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
