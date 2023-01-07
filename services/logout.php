<?php
session_start();
unset($_SESSION['VA_ADMIN']);
// session_destroy();
header("Location:../admin.php");
exit;
?>