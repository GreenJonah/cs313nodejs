<?php
	session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Checkout</title>
	<link rel="stylesheet" type="text/css" href="cart.css">
</head>
<body>
	<header>JunkFood.com</header><br/>
	<div class="headerImg"></div><br/>
	<form class="border" action="confirm.php" method="post">
		<h3>We are ready to ship your order, we just need some information about your address</h3><br/>
		<div>
	        Address: <br/><textarea name="address" rows="4" cols="35"></textarea><br/>
        </div>
        <a class="link" href="cart.php">Return to cart</a>
        <input class="link" type="submit" value="Place Order">
        <br/>
	</form>
	
	
</body>