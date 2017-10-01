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
<p><?php= SESSION["doritos"].ToString?> </p>
	<?php
	    echo "<header>JunkFood.com</header><br/>";
	    echo "<div class=\"headerImg\"></div>";
	    echo "<h2>Items in cart</h2>";
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
	?>
	<br/><a class="link" href="shop.php">Continue Shopping</a>
	<a class="link" href="checkout.php">Proceed To Checkout</a>
</body>