document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const errorMessages = {
        email: document.getElementById('email-error'),
        password: document.getElementById('password-error'),
    };
    
    Object.values(errorMessages).forEach(msg => {
        msg.style.color = 'red';
        msg.style.fontSize = '12px';
        msg.style.marginTop = '2px';
        msg.style.backgroundColor = '#FAF7F0';
    });
    
    function validateEmail(){
        if(!emailInput.value.endsWith('.com')) {
            errorMessages.email.textContent = 'Email must end with .com!';
            return false;
        } else {
            errorMessages.email.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if(passwordInput.value.length < 8) {
            errorMessages.password.textContent = 'Password must be at least 8 characters!';
            return false;
        } else if(!/[A-Z]/.test(passwordInput.value.charAt(0))) {
            errorMessages.password.textContent = 'Password must start with a capital letter!';
            return false;
        } else {
            errorMessages.password.textContent = '';
            return true;
        }
    }
    
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);
    
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if(isEmailValid && isPasswordValid) {
            alert('Login Successful!');
            window.location.href = 'html/home.html';
        } else {
            alert('Login Failed! Please check your data again.');
        }
    });
});