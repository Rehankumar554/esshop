// Check and apply theme on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to light theme
  if (savedTheme === "dark") {
    dark_mode();
  } else {
    light_mode();
  }
});

// Theme Setting
document.getElementById("light_mode").addEventListener("click", () => {
  light_mode();
  localStorage.setItem("theme", "light"); // Save theme as light
});

document.getElementById("dark_mode").addEventListener("click", () => {
  dark_mode();
  localStorage.setItem("theme", "dark"); // Save theme as dark
});

function light_mode() {
  document.body.style.backgroundColor = "#f9f9f9"; // Reset background color for light mode

  // Apply styles for light mode
  applyFilter("none");
}

function dark_mode() {
  document.body.style.backgroundColor = "#444"; // Set dark background color

  // Apply styles for dark mode
  applyFilter("invert(100%) hue-rotate(180deg)");
}

function applyFilter(filterValue) {
  if (document.getElementById("myModal"))
    document.getElementById("myModal").style.filter = filterValue;
  if (document.getElementById("dl"))
    document.getElementById("dl").style.filter = filterValue;
  if (document.getElementById("main"))
    document.getElementById("main").style.filter = filterValue;
  if (document.getElementById("tshirt_img"))
    document.getElementById("tshirt_img").style.filter = filterValue;

  document.querySelectorAll(".logo").forEach((ele) => {
    ele.style.filter = filterValue;
  });

  document.querySelectorAll(".pimg").forEach((ele) => {
    ele.style.filter = filterValue;
  });
}
