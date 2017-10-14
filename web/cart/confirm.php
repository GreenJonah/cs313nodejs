<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Confirmation</title>
	<link rel="stylesheet" type="text/css" href="cart.css">
</head>
<body>
	<?php
	    if($_POST['address'] != '')
	    { $_SESSION['address'] = $_POST['address']; }
		echo "<header>JunkFood.com</header><br/>";
	    echo "<div class=\"headerImg\"></div>";
	    echo "<h2>The following items will be sent</h2><br/>";
	    echo $_SESSION['doritos'];
		echo "<br/>";
		echo $_SESSION['lays'];
		echo "<br/>";
        echo $_SESSION['pizza'];
        echo "<br/>";
	    echo $_SESSION['tv'];
	    echo "<br/>";
		echo $_SESSION['reeses'];
		echo "<br/>"; 
		echo $_SESSION['skittles'];
		echo "<br/>"; 
		echo "<h2>Shipping Address</h2>";
		echo $_SESSION['address'];	
	?>
</body>