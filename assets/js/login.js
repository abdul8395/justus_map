var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("vausername").value;
var password = document.getElementById("vapassword").value;
if ( username == "VA_ADMIN" && password == "VA_ADMIN@justus"){
alert ("Login successfully");
window.location = "admin_home.html"; // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("vausername").disabled = true;
document.getElementById("vapassword").disabled = true;
// document.getElementById("submit").disabled = true;
return false;
}
}
}