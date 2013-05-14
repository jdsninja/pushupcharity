<?php
error_reporting(0);
header('Content-Type: application/json');

$type = $_POST['type'];

if($type == 'submit'){
	$email = $_POST['email'];
}else if($type == 'apply'){
	$name = $_POST['name'];
	$email = $_POST['email'];
}else if($type == 'buy'){
	$email = $_POST['email'];
}else if($type == 'questions'){
	$name = $_POST['name'];
	$email = $_POST['email'];
    $msg = $_POST['msg'];
}

if(!$email == "" && (!strstr($email,"@") || !strstr($email,".")))
{
$json = array(
    'status'=>'error',
    'msg'=>'Invalid Mail Address'
);
echo json_encode($json);
die ();
}


/*
if( empty($name) || empty($email) || empty($type) ) {
$json = array(
    'status'=>'error',
    'msg'=>'Invalid Mail Address or Name or Type'
);
echo json_encode($json);
die ();
}    */


$todayis = date("l, F j, Y, g:i a") ;

if($type == "submit"){
	$subject="Say Hello";
	//$hello = "Hey you received an Hello Message from CreativeDash Website : ";
	//$budget = "";

	$subject = "submit";
	$message = "message";
}else if($type == "apply"){
	$subject = "apply";
	$message = "message";
}else if($type == "buy"){
	$subject = "buy";
	$message = "message";
}else if($type == "questions"){
	$subject = "questions";
	//$hello = "Hey you received an Service Inquiry Message from CreativeDash Website : ";
	//$company = "Company: ".$company;
	//$budget = "Our Budget: ".$budget;
	$message = "message";

		/*
	$message = " $todayis  \n
	$hello \n
	From: $name ($email)\n
	$company\n
	Message: $msg \n
	$budget \n\n\n";

	$msg = stripcslashes($msg);
       */
}





$msg = stripcslashes($msg);

$from = "From: $email\r\n";

mail("getpushupcharity@gmail.com", $subject, $message, $from);

$json = array(
    'status'=>'ok'
);
echo json_encode($json);
?>