<?php
/**
 * php file part for contact form validate
 *
 * @package Kidzton - Responsive School Template
 */
    $name=$_POST['name'];
    $email=$_POST['email'];
    $number=$_POST['number'];
    $subject=$_POST['subject'];
    $message=$_POST['message'];		
	$from="From: $name $number $subject<$email>\r\nReturn-path: $email";
	$subject="Lightworks Enquiry";
	mail("vishwajeetnandkumarjain@gmail.com", $subject, $message, $from)

?>
