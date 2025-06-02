function toggleEdit(){
    window.location.href = 'edit-profile.html';
}

// function toggleBarcode() {
//     const barcodeSection = document.getElementById('barcode-section');
//     if (barcodeSection.style.display === 'none') {
//         barcodeSection.style.display = 'block';
//     } else {
//         barcodeSection.style.display = 'none';
//     }
// }

function toggleBarcode() {
    const barcodeSection = document.getElementById('barcode-section');
    const arrow = document.getElementById('arrow');

    const isHidden = barcodeSection.style.display === 'none';

    barcodeSection.style.display = isHidden ? 'block' : 'none';
    arrow.classList.toggle('rotated', isHidden);
}

// function toggleRegister(){
//     const confirmLogOut = confirm("Are you sure you want to log out?")
//     if(toggleRegister){
//         window.location.href = "register.html"
//     }
    
// }

function toggleRegister() {
    document.getElementById('logoutModal').style.display = 'block';
}

function closeLogoutModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

function logout() {
    // Tambahkan logika logout di sini
    window.location.href = "login.html"; // contoh redirect ke halaman login
}