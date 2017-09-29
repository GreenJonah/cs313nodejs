<?php
	session_start();
	$_SESSION['doritos'] = '';
	$_SESSION['lays'] = ''
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <title>JunkFood</title>
   <link rel="stylesheet" type="text/css" href="cart.css">
</head>
<body>
    <header>Welcome to JunkFood.com</header><br/>
	<div class="headerImg"></div><br/>
	<a class="link" href="cart.php">Cart</a><br/>
   
	<form method="post" action="cart.php">
		<h2>Chips</h2>
		<img src="doritos.jpg">
		<img src="lays.jpg">
		<img src="sun.jpg">
		<img src="veg.jpg"><br/>
		<input type='checkbox' class="add1" name="item0" value='1'>Add to cart</input>
		<input type='checkbox' class="add"  name="item1" value="1">Add to cart</input>
		<button class="add" id="sun Chips" value="Sun Chips" 
		   onclick="add()">Add to cart</button>
		<button class="add" id="veggie Straws" value="Veggie Straws" 
		   onclick="add()">Add to cart</button>


		<h2>Quick Meals</h2>
		<img src="pizza.jpg">
		<img src="tv.jpg">
		<img src="corndogs.jpg">
		<img src="burritos.jpg"><br/>
	    <button class="add1" id="pizza">Add to cart</button>
		<button class="add" id="tv Tray Dinner">Add to cart</button>
		<button class="add" id="corn Dogs">Add to cart</button>
		<button class="add" id="burritos">Add to cart</button>

		
		<h2>Sweets</h2>
		<img src="reeses.jpg">
		<img src="skittles.jpg">
		<img src="m&m.jpg">
		<img src="th.jpg"><br/>
		<button class="add1" id="reeses">Add to cart</button>
		<button class="add" id="skittles">Add to cart</button>
		<button class="add" id="m&m">Add to cart</button>
		<button class="add" id="twinkies">Add to cart</button></br>
		<input class="link" type="submit" value="Cart">
	</form>

</body>