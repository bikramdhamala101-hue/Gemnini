// Handles Email & Role Login
function handleEmailLogin(event) {
    event.preventDefault();
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;

    const userSession = {
        email: email,
        role: role,
        name: email.split('@')[0].toUpperCase(),
        authType: 'Email Password'
    };

    localStorage.setItem('currentUser', JSON.stringify(userSession));
    window.location.href = 'dashboard.html';
}

// Simulates OAuth Integration (Google)
function handleGoogleLogin() {
    const role = document.getElementById('role').value;
    const userSession = {
        email: 'google.user@educonsult.com',
        role: role,
        name: 'Google Auth User',
        authType: 'Google OAuth 2.0'
    };

    localStorage.setItem('currentUser', JSON.stringify(userSession));
    alert("Simulating Google Authentication Successful!");
    window.location.href = 'dashboard.html';
}

// Phone Auth UI Toggle
function togglePhoneAuth() {
    const phoneSection = document.getElementById('phoneAuthSection');
    phoneSection.classList.toggle('hidden');
}

function sendOTP() {
    const phone = document.getElementById('phoneNumber').value;
    if(!phone) { alert('Please enter a valid phone number'); return; }
    
    document.getElementById('otpGroup').classList.remove('hidden');
    alert(`OTP code '123456' sent to ${phone}`);
}

function verifyOTP() {
    const otp = document.getElementById('otpCode').value;
    const role = document.getElementById('role').value;
    
    if(otp === '123456') {
        const userSession = {
            email: 'phone.user@educonsult.com',
            role: role,
            name: 'Phone User',
            authType: 'Phone OTP'
        };
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid OTP Code. Use 123456 for testing.');
    }
}
