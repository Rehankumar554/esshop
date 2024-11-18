// Search filter
// Function to update URL with search query
function updateURL(searchTerm) {
  const url = new URL(window.location.href);
  url.searchParams.set("search", searchTerm);
  window.history.pushState({}, "", url);
}

// Function to filter products based on query parameter
function filterProducts() {
  const url = new URL(window.location.href);
  const searchTerm = url.searchParams.get("search");
  const searchQueryElement = document.getElementById("search_query");
  const products = document.querySelectorAll(".product-item");
  const allListedMessage = document.getElementById("all-listed-message"); // Element to show message
  let matchCount = 0;

  // Start timing the filter operation
  const startTime = performance.now();

  // Check if searchTerm is empty
  if (!searchTerm) {
    // Display all products if search term is blank
    products.forEach((product) => {
      product.style.display = "flex";
    });
    matchCount = products.length; // Set matchCount to total number of products
  } else {
    // Filter products based on search term
    const searchWords = searchTerm.toLowerCase().split(" ");
    products.forEach((product) => {
      const productName = product.getAttribute("data-name").toLowerCase();
      const matchFound = searchWords.some((word) => productName.includes(word));

      // Set display to 'flex' for matching products, 'none' otherwise
      product.style.display = matchFound ? "flex" : "none";

      // Count the product if it matches
      if (matchFound) matchCount++;
    });
  }

  // End timing the filter operation
  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(2);

  // Zero-pad matchCount to 3 digits
  const paddedMatchCount = String(matchCount).padStart(5, "0");

  // Display the number of matching products with padding and time taken
  searchQueryElement.textContent = `${paddedMatchCount} Products found in ${timeTaken} ms`;

  // Show "All products are listed" with product count if no search term and all products are displayed
  if (!searchTerm && matchCount === products.length) {
    allListedMessage.style.display = "block"; // Show the message
    allListedMessage.textContent = `All products are listed (${products.length} products)`; // Show product count
    searchQueryElement.style.display = "none"; // Hide the search_query
  } else {
    allListedMessage.style.display = "none"; // Hide the message if products are filtered
    searchQueryElement.style.display = "block"; // Show the search_query
  }

  // Set input values to search term from URL for user reference
  document.getElementById("typewriter-input").value = searchTerm;
  document.getElementById("fxb_search").value = searchTerm;
}

// Function to handle Enter key event for search inputs
function handleSearchInput(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission if in a form
    const searchTerm = event.target.value;
    updateURL(searchTerm); // Update the URL with the search term
    filterProducts(); // Apply the filter based on the updated URL
  }
}

// Add event listener for both search inputs
document
  .getElementById("typewriter-input")
  .addEventListener("keypress", handleSearchInput);
document
  .getElementById("fxb_search")
  .addEventListener("keypress", handleSearchInput);

// Run filterProducts on page load to apply any existing search from URL
window.addEventListener("load", function () {
  // Clear the search_query content on page load if query is empty
  const searchTerm = new URL(window.location.href).searchParams.get("search");

  if (!searchTerm) {
    document.getElementById("search_query").textContent = ""; // Clear the search_query on page load
  }

  filterProducts(); // Apply the filter when page loads
});
