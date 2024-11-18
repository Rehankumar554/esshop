window.onload = function() {
    var div = document.getElementById("loader");
    
    // Div ko display karne ke liye
    div.style.display = "flex";
    
    // 1. 1950 
    // 2. 900 
    setTimeout(function() {
        div.style.display = "none";
    }, 900);
};
