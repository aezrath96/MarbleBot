<?php
$amount = $_POST['amount'];
include("mydb.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE playeramount SET amount='$amount' WHERE id='1'";

if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
<?php

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if($amount > '0') {
$sql = "UPDATE racestate SET RaceState='1' WHERE id='1'";
}
else
{
$sql = "UPDATE racestate SET RaceState='0' WHERE id='1'";
}

if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();
header("Location: /racestate.php");
?>