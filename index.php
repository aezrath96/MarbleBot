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
<div class="ui inverted two item menu" style="width:95%;">
  <a class="active item" href="/Bot">Commands</a>
  <a class="item" href="/Bot/racestate.php">Race State</a>
</div>
<div class="ui inverted raised segment" style="width:95%;">
  <p>
  <div class="tab">
  <button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen" style="pointer-events: none; cursor:not-allowed;">Camera Commands</button>
</div>

<div id="London" class="tabcontent">
  <p>
  <?php
include("mydb.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM commands";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  echo '<div class="ui inverted segment">
  <div class="ui two column very relaxed grid">';
  while($row = $result->fetch_assoc()) {
    echo '
      <div class="column"><strong>Name:</strong>
        <p><div class="ui fluid input"><input type="text" readonly style="width:100%;font-weight:bold;background-color:#121212;color:white;" value="';
    echo $row['Name'];
    echo '"></div></p>
    </div>
    <div class="column"><strong>Parameter:</strong>
      <p><div class="ui fluid input"><input type="text" readonly style="width:100%;font-weight:bold;background-color:#121212;color:white;" value="';
      echo $row['Parameter'];
      echo '"></div></p>
      </div>';
  }
  echo '
  </div><div class="ui vertical divider">
</div>
</div>';
} else {
  echo "0 results";
}
$conn->close();
?>
  </p>
</div>

<script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
</script>  
  </p>
</div>
</div>
</body>
</html>