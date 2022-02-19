document.getElementById('log-head-id').addEventListener("click", function() {
    document.getElementById('login-id').style.marginTop = "10rem";
    document.getElementById('log-sign-hr-id').style.transform = "translateX(0%)";
    document.getElementById('login-form-id').style.display = "block";
    document.getElementById('login-title-id').style.display = "block";
    document.getElementById('registration-id').style.display = "none";
    document.getElementById('reg-title-id').style.display = "none";
});
document.getElementById('sign-head-id').addEventListener("click", function() {
    document.getElementById('login-id').style.marginTop = "5rem";
    document.getElementById('log-sign-hr-id').style.transform = "translateX(100%)";
    document.getElementById('login-form-id').style.display = "none";
    document.getElementById('login-title-id').style.display = "none";
    document.getElementById('registration-id').style.display = "block";
    document.getElementById('reg-title-id').style.display = "block";
});