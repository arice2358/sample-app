"use strict";
$(document).ready(function () {
    document.getElementById("signInName").tabIndex = "1";
    document.getElementById("password").tabIndex = "2";
    document.getElementById("next").tabIndex = "3";
    document.getElementById("createAccount").tabIndex = "4";
    document.getElementById("forgotPassword").tabIndex = "5";
});


function makePwdToggler(pwd){
    // Create show-password checkbox
    var span = document.createElement('span');
    span.classList.add("password-toggle-icon");

    var icon = document.createElement('i');
    icon.className = "glyphicon glyphicon-eye-close";
    
    var id = pwd.id + 'togglePassword';
    icon.setAttribute('id', id);
    span.appendChild(icon);

  
    // Add show-password checkbox under password input
    pwd.insertAdjacentElement('afterend', span);
  
    // Add toggle password callback
    function toggle(){
      if(pwd.type === 'password'){
        pwd.type = 'text';
        icon.className = "glyphicon glyphicon-eye-open";
      } else {
        pwd.type = 'password';
        icon.className = "glyphicon glyphicon-eye-close";
      }
    }
    icon.onclick = toggle;
    // For non-mouse usage
    icon.onkeydown = toggle;
  }
  
  function setupPwdTogglers(){
    var pwdInputs = document.querySelectorAll('input[type=password]');
    for (var i = 0; i < pwdInputs.length; i++) {
      makePwdToggler(pwdInputs[i]);
    }
  }
  
  setupPwdTogglers();