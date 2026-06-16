<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {

        // ======================
        // SMTP CONFIG (ADD HERE)
        // ======================
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        // 🔴 YOUR GOOGLE WORKSPACE EMAIL
        $mail->Username = 'ayushdce2@gmail.com';

        // 🔴 GOOGLE APP PASSWORD (NOT normal password)
        $mail->Password = 'opie jeaz wsga qiuh';

        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // ======================
        // EMAIL SETTINGS
        // ======================
        $mail->setFrom('business@alpgroupindia.com', 'ALP Website');
        $mail->addAddress('business@alpgroupindia.com');

        // user reply goes to sender
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = "New Contact Form Submission";

        $mail->Body =
"Name: $name
Email: $email
Phone: $phone
Service: $service
Message: $message";

        $mail->send();

        echo "<script>
        
            window.location.href='index.html';
        </script>";

    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>