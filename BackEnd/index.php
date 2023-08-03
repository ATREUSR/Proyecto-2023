<?php
  $_ENV = parse_ini_file(".env");
  $mysqli = mysqli_init();
  $mysqli->ssl_set(NULL, NULL, './cacert.pem', NULL, NULL);
  $mysqli->real_connect($_ENV["HOST"], $_ENV["USERNAME"], $_ENV["PASSWORD"], $_ENV["DATABASE"]);
    // Query name, surname, dni and email from table named user

    $result = $mysqli->query("SELECT name, surname, dni, email FROM user");
    while($row = $result->fetch_assoc()) { 
        echo $row['name'] . " " . $row['surname'] . " " . $row['dni'] . " " . $row['email'] . "\n";
        echo "<br>";
    }



  $mysqli->close();
?>