<?php
include 'php/getin.php';
$con = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$search = mysqli_real_escape_string($con, $_GET['search']);
$con->close();
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$search = $search.'%';
$checkpass = "SELECT * FROM output WHERE list_id LIKE '$search'";
$result = $conn->query($checkpass);
//If there's at least 1 result from query
if ($result->num_rows > 0) {
	$rows = array();
	  while($r = mysqli_fetch_array($result)) {
	    $rows[] = $r;
	  }
	echo json_encode($rows);
}else{
	echo "";
}
$conn->close();
?>
