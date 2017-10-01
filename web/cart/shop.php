<?php
	session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <title>JunkFood</title>
   <link rel="stylesheet" type="text/css" href="cart.css">
</head>
<body>
    <?php
    	if ($_POST['item0'] == '1'){
			$_SESSION['doritos'] = "Doritos"; } 

		if ($_POST['item1'] == '1'){
			$_SESSION['lays'] = "Lays"; }

    	if ($_POST['item2'] == '1'){
        	$_SESSION['pizza'] = "Pizza";}
	    
	    if ($_POST['item3'] == '1'){
			$_SESSION['tv'] = "Tv Tray Dinner";}
	    
	    if ($_POST['item4'] == '1'){
			$_SESSION['reeses'] = "Reeses";} 
	    
	    if ($_POST['item5'] == '1'){
			$_SESSION['skittles'] = "Skittles";}  
    ?>
    <header>Welcome to JunkFood.com</header><br/>
	<div class="headerImg"></div><br/>
	 
	<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
	<input class="link" type="submit" value="Add Items To Cart">
	<a class="link" href="cart.php">Go To Cart</a><br/>
		<h2>Chips</h2>
		<img src="doritos.jpg">
		<img src="lays.jpg"><br/>
		<input type='checkbox' class="add1" name="item0" 
		  value='1'>Add to cart</input>
		<input type='checkbox' class="add"  name="item1" 
		  value="1">Add to cart</input>

		<h2>Quick Meals</h2>
		<img src="pizza.jpg">
		<img src="tv.jpg"><br/>
	    <input type='checkbox' class="add1" name="item2"
	      value="1">Add to cart</button>
		<input type='checkbox' class="add" name="item3"
		  value="1">Add to cart</button>
		
		<h2>Sweets</h2>
		<img src="reeses.jpg">
		<img src="skittles.jpg"><br/>
		<input type="checkbox" class="add1" name="item4"
		  value="1">Add to cart</button>
		<input type="checkbox" class="add" name="item5"
		  value="1">Add to cart</button><br/>
		
	</form>

</body>