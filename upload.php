<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Upload</title>
</head>
<body>
<?php
include 'path/to/logindetails.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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

$successfulpassword = 0;
do{
// Make a password
function gen_uid($l=10){
	$str = ""; 
	for ($x=0;$x<$l;$x++) 
	$str .= substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, 1); 
	return $str;
}
$createpass = gen_uid($l=10);
$checkpass = "SELECT id FROM focuses WHERE password = '$createpass'";
$result = $conn->query($checkpass);
//If there's at least 1 result from query
if ($result->num_rows > 0) {
	//Run the following code for each result
    while($row = $result->fetch_assoc()) {
	}
}else{
	$successfulpassword++;
}
} while ($successfulpassword !== 1);

foreach ($ids as $key => $value) {
	
		
	$sql = "INSERT INTO focuses (focus_id, focus_name, focus_description, focus_x, focus_y, focus_bypass, focus_mutual, focus_available, focus_ai, focus_gfx, focus_prefocus, focus_reward, focus_ttc,country_affected, public_private, password, tags, notes) VALUES ('$ids[$key]','$names[$key]','$descs[$key]',$xs[$key],$ys[$key],'$bypasses[$key]','$mutuals[$key]','$availables[$key]','$ai[$key]','$imgs[$key]','$prefocuses[$key]','$rewards[$key]','$ttcs[$key]','ENG','0','$createpass','test','')";
	//$sql = "INSERT INTO focuses (focus_id) VALUES ($ids[$key])";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
}




$conn->close();

?>
<div><div id="pw"><?php echo $createpass; ?></div></div>
</body>
</html>