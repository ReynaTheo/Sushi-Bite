function toggleEdit(){
    window.location.href = 'edit-profile.html';
}

function toggleBarcode() {
    const barcodeSection = document.getElementById('barcode-section');
    const arrow = document.getElementById('arrow');

    const isHidden = barcodeSection.style.display === 'none';

    barcodeSection.style.display = isHidden ? 'block' : 'none';
    arrow.classList.toggle('rotated', isHidden);
}

function toggleRegister() {
    document.getElementById('logoutModal').style.display = 'block';
}

function closeLogoutModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

function logout() {
    window.location.href = "login.html";
}