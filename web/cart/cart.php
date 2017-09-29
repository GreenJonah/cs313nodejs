<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Cart</title>
	<link rel="stylesheet" type="text/css" href="cart.css">
</head>
<body>
	<?php
		if ($_POST['item0'] == '1'){
			echo $_POST['item0'];
			$_SESSION['doritos'] = "Doritos"; 
		}
		if ($_POST['item1'] == '1')
			$_SESSION['lays'] += "Lays";
		print_r($_SESSION);
		//echo  $_POST['Cart'];
	?>
	<header>JunkFood.com</header><br/>
	<div class="headerImg"></div><br/>
	<a class="link" href="shop.php">Continue Shopping</a>
	<a class="link" href="checkout.php">Checkout</a>
</body>