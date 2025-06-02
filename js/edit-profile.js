function toggleProfile() {
    document.getElementById('saveModal').style.display = 'block';
}

function closeSaveModal() {
    document.getElementById('saveModal').style.display = 'none';
}

function saveChanges() {
    closeSaveModal();
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        window.location.href = "profile.html";
    }, 1500); 
}