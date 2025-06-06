document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
});

const ItemHeaders = document.querySelectorAll(".founder-cards-content");

ItemHeaders.forEach(ItemHeader => {
    ItemHeader.addEventListener("click", event => {
        ItemHeader.classList.toggle("active");

        const ItemBody = ItemHeader.nextElementSibling;

        if(ItemHeader.classList.contains("active")){
            ItemBody.style.maxHeight = ItemBody.scrollHeight + "px"
        } else {
            ItemBody.style.maxHeight = 0;
        }
    })
})

document.querySelectorAll('.founder-cards-content').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const icon = header.querySelector('#dropdown-icon');

    body.classList.toggle('active');
    icon.classList.toggle('rotated');
  });
});

function toggleDropdown() {
      const menu = document.getElementById("menuDropdown");
      menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        document.getElementById("menuDropdown").style.display = "none";
      }
});