<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Upload</title>
</head>
<body>
<?php
$ids = $_POST['ids'];
$names = $_POST['names'];
$descs = $_POST['descs'];
$prefocuses = $_POST['prefocuses'];
$availables = $_POST['availables'];
$mutuals = $_POST['mutuals'];
$rewards = $_POST['rewards'];
$imgs = $_POST['imgs'];
$xs = $_POST['xs'];
$ys = $_POST['ys'];
$bypasses = $_POST['bypasses'];
$ttcs = $_POST['ttcs'];
$ai = $_POST['ai'];

// Replace with path to login details
include 'path/to/logindetails.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

foreach ($ids as $key => $value) {
	$sql = "INSERT INTO focuses (focus_id, focus_name, focus_description, focus_x, focus_y, focus_bypass, focus_mutual, focus_available, focus_ai, focus_gfx, focus_prefocus, country_affected, public_private, password, tags, notes) VALUES ('$ids[$key]','$names[$key]','$descs[$key]',$xs[$key],$ys[$key],'$bypasses[$key]','$mutuals[$key]','$availables[$key]','$ai[$key]','$imgs[$key]','$prefocuses[$key]','ENG','0','t3sto4ss','test','')";
	//$sql = "INSERT INTO focuses (focus_id) VALUES ($ids[$key])";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
}
	
	



$conn->close();
?>
</body>
</html>