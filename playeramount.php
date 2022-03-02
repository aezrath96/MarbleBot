<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
  />
  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
    <title>Twitchy Dashboard</title>
    <style>
body {font-family: Arial;}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 0px solid #ccc;
  background-color: #121212;
  color: white;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  color: white;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ff0000;
  color: white;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #121212;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 0px solid #ccc;
  border-top: none;
}

/* Style the close button */
.topright {
  float: right;
  cursor: pointer;
  font-size: 28px;
}

.topright:hover {color: red;}
</style>
</head>
<body style="background-color:#121212;">
<div align="center">
<h1><font color="red">Twitchy Dashboard</font></h1>
<div class="ui inverted three item menu" style="width:90%;">
  <a class="item" href="/Bot">Commands</a>
  <a class="active item" href="/Bot/racestate.php">Race State</a>
</div>
<div class="ui inverted raised segment" style="width:90%;">
  <p>
  <?php
include("mydb.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  $sql = "SELECT * FROM racestate";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
   $racestate = $row['RaceState'];
   if($racestate == '1') {
       echo "There is an active race at the moment.";
       echo '<br><br><a href="stoprace.php"><button class="fluid ui red button">Stop Race</button></a>';
   }
   else
   {
       echo "There are no active races at the moment.";
       echo '<br><br><a href="startrace.php"><button class="fluid ui blue button">Start Race</button></a>';
   }
    }
  } else {
    echo "0 results";
  }
  $conn->close();
  ?>
  <br>
  <?php

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  $sql = "SELECT * FROM playeramount WHERE Id='1'";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
   $playeramount = $row['amount'];
   echo "There are/is currently $playeramount player/s in the race.";
   echo "<br><br>Edit player amount:";
   echo "<form method='post' action='editplayeramount.php'>";
   echo '<div class="ui fluid input"><input type="number" min="0" max="9" name="amount" required style="width:100%;" placeholder="Amount of players" title="0 is for when there is no running race at the moment!" value="';
   echo $row['amount'];
   echo '"></div>';
   echo '<br><button type="submit" class="fluid ui green button">Adjust # of players</button>';
   echo "</form>";
    }
  } else {
    echo "0 results";
  }
  $conn->close();
  ?>
  </p>
</div>
</div>
</body>
</html>