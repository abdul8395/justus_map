
<?php
session_start();
if(isset($_SESSION['VA_ADMIN'])){
    echo "you are already login";
}else {
    $user_name = $_POST['vausername'];
    $user_pass = $_POST['vapassword'];

    $provided_username = "VA_ADMIN";
    $provided_password = "VA_ADMIN@justus";
    
    if ($provided_username == $user_name && $provided_password==$user_pass) {
        $_SESSION['VA_ADMIN']=$provided_username;
        echo json_encode("success");
    }else{
        echo json_encode("failed");
    }
}
?>