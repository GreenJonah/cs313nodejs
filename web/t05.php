<html>
<body>

<?php
try

{

 $user = 'postgres';

 $password = 'Poopsacks1';

 $db = new PDO('pgsql:host=127.0.0.1;dbname=t05', $user, $password);

}

catch (PDOException $ex)

{

 echo 'Error!: ' . $ex->getMessage();

 die();

}

foreach ($db->query('SELECT book, chapter, verse, content FROM scriptures')as $row)
{
  echo '<b>' . $row['book'] . ' ' . $row['chapter'] . ':' . $row['verse']. '</b>';

           echo ' - "' . $row['content'] . '"';            

           echo '<br/>';
}

?>

</body>
</html>