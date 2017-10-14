<?php
  require "dbConnect.php";
  $db = get_db();
?>
<html>
<head>
  <title>Project1</title>
  <link rel="stylesheet" type="text/css" href="project1.css">
</head>
<body>

<p id="title">Endurocross 2018 Registration</p>

<form>
  <table id="enter">
  <tr> 
    <td>
      <label for="firstName">First Name:</label></br>
      <input class="input" type="text" id="firstName">
    </td>
    <td>
      <label for="lastName">Last Name:</label></br>
      <input class="input" type="text" id="lastName">
    </td>
  </tr>
  <tr>
    <td>
      <label for="Email">Email:</label></br>
      <input class="input" type="text" id=email>
    </td>
    <td>
      <label for="password">Password:</label></br>
      <input class="input" type="text" id=password>
    </td>
  </tr>
  <tr>
    <td>
      <label for="bikeSize">Bike Size:</label></br>
      <select class="input">
      <option>450</option>
      <option>350</option>
      <option>300</option>
      <option>250</option>
      <option>125</option>
      </select>
    </td>
    <td>
      <label for="race">Select a Terrain:</label></br>
      <select class="input">
      <option>Mountain</option>
      <option>Desert</option>
      <option>Rocks n' Logs</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>
      <button type="submit" id="submit">Submit</button>
    </td>
    <td>  
      <button type="reset" id="clear">Clear Form</button>
    </td>
  </tr>
  </table>
</form></br>

  <p class="location"> All races will be held on June 22nd Participants will be notified of the location on the 10th of June.</p>
  <table id="display">
  <tr class="easyRead">
  <th>First Name</th>
  <th>Last Name</th>
  <th>Terrain Chosen</th>
  <th>Bike Size</th>
  </tr>
  <?php
  /*
try

{

 $user = 'ta_user';

 $password = 'ta_pass';

 $db = new PDO('pgsql:host=127.0.0.1;dbname=raceform', $user, $password);

}

catch (PDOException $ex)

{

 echo 'Error!: ' . $ex->getMessage();

 die();

}
*/
/*
$statement = $db->prepare("SELECT firstname, lastname FROM racers");
$statement->execute();
while ($row = $statment->fetch(PDO::FETCH_ASSOC))
{
  echo '<p>';
  echo '<strong>' .$row['firstname']. ' ' . $row['lastname'];
  echo '</p>';
}
*/
foreach ($db->query('SELECT t1.firstname, t1.lastname, t1.terrain_id, t1.bikes_id, t2.id, t2.terrain_type, t3.id, t3.bike_type
 FROM racers t1 INNER JOIN terrain t2 ON t1.terrain_id = t2.id
 INNER JOIN bikes t3 ON t1.bikes_id = t3.id')as $row)
{
  echo '<tr class="easyRead"><td>' . $row['firstname'] . '</td><td>' . $row['lastname'] . 
       '</td><td>' . $row['terrain_type']. '</td><td>' . $row['bike_type']. 
       '</td><td><input type=\'button\' id=\'edit\' value=\'Edit\'></tr>';            
}

?>
  </table>
</body>
</html>

