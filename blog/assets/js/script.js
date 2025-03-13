const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})
const checkboxMenu = document.getElementById("checkbox-menu")
checkboxMenu.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
  const menuCheckbox = document.querySelector(".menu");
  const menuList = document.querySelector(".menu-list");

  menuCheckbox.addEventListener("change", function () {
    if (this.checked) {
      menuList.style.display = "block";
    } else {
      menuList.style.display = "none";
    }
  });
  document.querySelectorAll('.title-post').forEach(post => {
    post.addEventListener('click', function () {
      const postTitle = this.innerText;
      localStorage.setItem('selectedPost', postTitle);
      if (window.location.pathname.includes('/pages/post.html')) {
        window.location.href = './post.html';
      }
      else {
        window.location.href = './pages/post.html';
      }
    });
  });
});
