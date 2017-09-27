<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>

User's name: <?php echo $_POST["name"]; ?><br>
Email address: 
    <?php 
    echo $_POST["email"]; 
    $mail=$_POST["email"]; 
    echo "<br><a href='mailto:" . $mail . "?body=" . "" . "'>Mailto link</a>"
    ?><br>
User's major: <?php echo $_POST["major"]; ?><br>
User's comments: <?php echo $_POST["comment"]; ?> <br>
User's visited continents: <?php echo $_POST["location1"]; ?> <br>
<?php echo $_POST["location2"]; ?> <br>
<?php echo $_POST["location3"]; ?> <br>
<?php echo $_POST["location4"]; ?> <br>
<?php echo $_POST["location5"]; ?> <br>
<?php echo $_POST["location6"]; ?> <br>
<?php echo $_POST["location7"]; ?> <br>

</body>
</html>