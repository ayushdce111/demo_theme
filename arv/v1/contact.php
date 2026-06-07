<?php
/**
 * ARV International – Contact Form Handler
 * Place this file on your VPS in the same directory as index.html
 * Requires: PHP 7.4+, a working sendmail/SMTP on the server
 *
 * For SMTP (recommended on VPS), install PHPMailer:
 *   composer require phpmailer/phpmailer
 * Then uncomment the PHPMailer block below and fill in credentials.
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// ── CORS (adjust origin to your domain) ──
$allowed_origin = 'https://arvinternational.com'; // change to your domain
if (isset($_SERVER['HTTP_ORIGIN'])) {
    if ($_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
        header("Access-Control-Allow-Origin: $allowed_origin");
    }
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Sanitize inputs ──
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$phone   = clean($_POST['phone']   ?? '');
$country = clean($_POST['country'] ?? '');
$company = clean($_POST['company'] ?? '');
$service = clean($_POST['service'] ?? '');
$message = clean($_POST['message'] ?? '');

// ── Validation ──
$errors = [];
if (empty($name))    $errors[] = 'Name is required.';
if (empty($email) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
    $errors[] = 'A valid email address is required.';
if (empty($message)) $errors[] = 'Message is required.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Rate limiting (simple file-based, per IP) ──
$rate_file = sys_get_temp_dir() . '/arv_rate_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
$now       = time();
$limit_sec = 60;   // window in seconds
$limit_max = 3;    // max submissions per window

$history = file_exists($rate_file) ? json_decode(file_get_contents($rate_file), true) : [];
$history = array_filter($history, fn($t) => ($now - $t) < $limit_sec);

if (count($history) >= $limit_max) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please wait a minute and try again.']);
    exit;
}

$history[] = $now;
file_put_contents($rate_file, json_encode(array_values($history)));

// ── Build email ──
$to      = 'info@arvinternational.com';
$subject = "New Inquiry from $name – ARV International Website";

$body = <<<EOT
New contact form submission received from the ARV International website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Name       : $name
  Email      : $email
  Phone      : {$phone}
  Country    : {$country}
  Company    : {$company}
  Service    : {$service}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$message

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: {$_SERVER['REMOTE_ADDR']} @ " . date('Y-m-d H:i:s T') . "
EOT;

// ── AUTO-REPLY body ──
$autoReply = <<<EOT
Dear $name,

Thank you for reaching out to ARV International!

We have received your enquiry and our team will get back to you within 24 business hours.

Here is a copy of your message:
-------------------------------------------
$message
-------------------------------------------

If you need immediate assistance, please call us or reply to this email.

Best regards,
ARV International Team
info@arvinternational.com

---
ARV Sourcing Pvt. Ltd. | New Delhi, India
EOT;

// ── OPTION A: PHP mail() ── (works if server has sendmail configured)
$headers  = "From: ARV Website <noreply@arvinternational.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

// Auto-reply to visitor
if ($sent) {
    $ar_headers  = "From: ARV International <info@arvinternational.com>\r\n";
    $ar_headers .= "MIME-Version: 1.0\r\n";
    $ar_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    mail($email, "We received your enquiry – ARV International", $autoReply, $ar_headers);
}

/*
 * ── OPTION B: PHPMailer via SMTP (recommended for VPS) ──
 * Install: composer require phpmailer/phpmailer
 * Then comment out OPTION A above and uncomment below:
 *
 * require 'vendor/autoload.php';
 * use PHPMailer\PHPMailer\PHPMailer;
 * use PHPMailer\PHPMailer\Exception;
 *
 * $sent = false;
 * try {
 *     $mail = new PHPMailer(true);
 *     $mail->isSMTP();
 *     $mail->Host       = 'smtp.your-host.com';      // e.g. smtp.gmail.com / mail.arvinternational.com
 *     $mail->SMTPAuth   = true;
 *     $mail->Username   = 'info@arvinternational.com';
 *     $mail->Password   = 'YOUR_EMAIL_PASSWORD';
 *     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
 *     $mail->Port       = 587;
 *     $mail->setFrom('info@arvinternational.com', 'ARV International');
 *     $mail->addAddress('info@arvinternational.com', 'ARV International');
 *     $mail->addReplyTo($email, $name);
 *     $mail->Subject = $subject;
 *     $mail->Body    = $body;
 *     $mail->send();
 *
 *     // Auto-reply
 *     $mail->clearAddresses();
 *     $mail->addAddress($email, $name);
 *     $mail->Subject = "We received your enquiry – ARV International";
 *     $mail->Body    = $autoReply;
 *     $mail->send();
 *     $sent = true;
 * } catch (Exception $e) {
 *     error_log("PHPMailer Error: " . $e->getMessage());
 *     $sent = false;
 * }
 */

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please contact us directly at info@arvinternational.com']);
}
