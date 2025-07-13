<?php
// Set content type and character encoding
header('Content-Type: text/html; charset=UTF-8');

// Validate required fields
$requiredFields = ['company_name', 'address', 'phone', 'email', 'contact_name'];
$missingFields = [];
foreach ($requiredFields as $field) {
  if (empty($_POST[$field])) {
    $missingFields[] = $field;
  }
}

if (!empty($missingFields)) {
  die("<script>alert('الرجاء ملء جميع الحقول المطلوبة: " . implode(', ', $missingFields) . "'); window.history.back();</script>");
}

// Validate email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  die("<script>alert('البريد الإلكتروني غير صحيح'); window.history.back();</script>");
}

// Sanitize inputs
function sanitizeInput($data)
{
  return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

$company_name = sanitizeInput($_POST['company_name']);
$address = sanitizeInput($_POST['address']);
$phone = sanitizeInput($_POST['phone']);
$email = sanitizeInput($_POST['email']);
$contact_name = sanitizeInput($_POST['contact_name']);

// Process test types
$test_types = [];
if (isset($_POST['test_type']) && is_array($_POST['test_type'])) {
  foreach ($_POST['test_type'] as $type) {
    $test_types[] = sanitizeInput($type);
  }

  // Handle "Other" test type if specified
  if (in_array('Other', $test_types) && !empty($_POST['other_test'])) {
    $test_types[] = sanitizeInput($_POST['other_test']);
  }
}

// Process frequency
$frequency = '';
if (!empty($_POST['frequency'])) {
  $frequency = sanitizeInput($_POST['frequency']);
  if ($frequency === 'Other' && !empty($_POST['other_frequency'])) {
    $frequency = sanitizeInput($_POST['other_frequency']);
  }
}

// Email configuration
$to = "info@deqat-pt.com";
$subject = "New Proficiency Test Submission - " . $company_name;

// HTML email template
$message = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>Proficiency Test Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f8f9fa; text-align: left; padding: 10px; }
        td { padding: 10px; border: 1px solid #ddd; }
        .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
    </style>
</head>
<body>
    <h2>New Proficiency Test Submission</h2>
    <table>
        <tr><th>Company Name:</th><td>$company_name</td></tr>
        <tr><th>Address:</th><td>$address</td></tr>
        <tr><th>Phone:</th><td>$phone</td></tr>
        <tr><th>Email:</th><td>$email</td></tr>
        <tr><th>Contact Name:</th><td>$contact_name</td></tr>
        <tr><th>Test Types:</th><td>" . implode("<br>", $test_types) . "</td></tr>
        <tr><th>Participation Frequency:</th><td>$frequency</td></tr>
    </table>
    <div class='footer'>
        <p>This email was sent from the DEQAT AL-KAFAA website contact form.</p>
        <p>Submission time: " . date('Y-m-d H:i:s') . "</p>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: DEQAT AL-KAFAA <noreply@deqat-pt.com>\r\n";
$headers .= "Reply-To: $contact_name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $message, $headers)) {
  // Success - redirect with success message
  echo "<script>
        alert('تم إرسال طلبك بنجاح. شكراً لتواصلك مع دقة الكفاءة');
        window.location.href = 'index.html';
    </script>";
} else {
  // Error - redirect with error message
  echo "<script>
        alert('عذراً، حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى لاحقاً.');
        window.history.back();
    </script>";
}
