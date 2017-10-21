<?php
	session_start();
	require "dbConnect.php";
  	$db = get_db();
	$_SESSION['rider'] = $_POST['edit'];	
?>
<!DOCTYPE html>
<html>
<head>
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="project1.css">
	<script type="text/javascript" src="project1.js"></script>
</head>
<body>
	<p id="title">Please Login</p>
	<div class='notCorrect' id='notCorrect'>Your info does not match the chosen riders pofile</div><br/>
	<table class="enter">
		<tr>
		<td>
			<label for="firstName">First Name:</label></br>
      		<input class="input" type="text" id="firstCheck" value=''>	
		</td>
		</tr>
		<tr>
			<td>
				<label for="password">Password:</label></br>
      			<input class="input" type="text" id="passwordCheck" value=''>
			</td>
		</tr>
		<tr>
	    <td>
	      <input type="button" id="login" onclick='login()' value='login'>
	    </td>
	    <td>  
	      	<form action="project1.php">
    			<input type="submit" value="Go Back" />
			</form>
	    </td>
		</tr>
	</table>
	<?php
		foreach ($db->query ('SELECT firstname, password FROM racers WHERE rid =' . $_SESSION['rider']) as $row)
		{
			echo '<div id=\'first\' value=\'' . $row['firstname'] . '\'></div><div id=\'pass\' value=\''. $row['password'] . '\'hidden></div>';
		}
	?>
	<div id='test'></div>
</body>
</html>