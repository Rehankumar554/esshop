// Add event listener to the hamburger div
document.getElementById("hamburger").addEventListener("click", function () {
  toggleNavbar();
});

function toggleNavbar() {
  var navbar = document.querySelector(".navbar");

  // Check if the navbar is expanded
  if (navbar.style.height === "50px" || navbar.style.height === "") {
    // Get the full height of the content inside the navbar
    var fullHeight = navbar.scrollHeight + "px";

    // Expand the navbar smoothly
    navbar.style.height = fullHeight;
  } else {
    // Collapse the navbar smoothly back to 50px
    navbar.style.height = "50px";
  }
}

// Filter Expand Function
document.getElementById("fxb").addEventListener("click", function () {
  openFil();
});

document.getElementById("closebtn").addEventListener("click", function () {
  closeFil();
});

function openFil() {
  document.getElementById("filters").style.width = "300px";

  function applyRespStyle() {
    if (window.innerWidth <= 331) {
      document.getElementById("filters").style.width = "100%";
    } else if (window.innerWidth <= 452) {
      document.getElementById("filters").style.width = "70%";
    } else {
      document.getElementById("filters").style.width = "300px";
    }
  }

  applyRespStyle();
  window.addEventListener('resize', applyRespStyle);
}

function closeFil() {
  document.getElementById("filters").style.width = "0px";
}

// Expand Filter Position Setting Function
const pdiv = document.querySelector(".container");
const cdiv = document.querySelector(".filters");

pdiv.addEventListener("scroll", () => {
  if (pdiv.scrollTop > 10) {
    cdiv.style.position = "fixed";
    cdiv.style.top = pdiv.getBoundingClientRect().top + "px";
  } else {
    cdiv.style.position = "absolute";
    cdiv.style.top = "0";
  }
});
