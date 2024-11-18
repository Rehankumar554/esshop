// Array to hold the original product list
let originalProducts = [];

function applyPriceFilter() {}
function filterByRating() {}
function filterByCategory() {}
function filterByOffer() {}
function filterBySize() {}

// Function to filter products based on all active filters
function filterProducts() {
  const slider = document.getElementById("priceRange");
  const maxPrice = parseInt(slider.value);

  const ratingCheckbox = document.getElementById("4-stars");
  const minRating = ratingCheckbox.checked ? 4 : 0;

  // Get selected categories
  const categoryCheckboxes = document.querySelectorAll(".category");
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const offerCheckboxes = document.querySelectorAll(".offer");
  const selectedOffer = Array.from(offerCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const sizeCheckboxes = document.querySelectorAll(".size");
  const selectedSize = Array.from(sizeCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear the current product list

  // Filter and display products based on price, rating, and categories
  originalProducts.forEach((product) => {
    const productPrice = parseInt(product.getAttribute("data-price"));
    const productRating = parseInt(product.getAttribute("data-rating"));
    const productCategory = product.getAttribute("data-category");
    const productOffer = product.getAttribute("data-offer");
    const productSize = product.getAttribute("data-size");

    let showProduct = true;

    // Price filter check
    if (productPrice > maxPrice) {
      showProduct = false;
    }

    // Rating filter check
    if (productRating < minRating) {
      showProduct = false;
    }

    // Category filter check
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(productCategory)
    ) {
      showProduct = false;
    }

    if (selectedOffer.length > 0 && !selectedOffer.includes(productOffer)) {
      showProduct = false;
    }

    if (selectedSize.length > 0 && !selectedSize.includes(productSize)) {
      showProduct = false;
    }

    // If all conditions pass, show the product
    if (showProduct) {
      productList.appendChild(product);
    }
  });
}

// Sort function -- Sorts products but does not reapply filters until "Apply" is clicked
function sortItems() {
  const sortOption = document.querySelector('input[name="sort"]:checked').value;

  originalProducts.sort((a, b) => {
    const priceA = parseInt(a.getAttribute("data-price"));
    const priceB = parseInt(b.getAttribute("data-price"));

    return sortOption === "lowToHigh" ? priceA - priceB : priceB - priceA;
  });
}

// Price range filter -- Initial tooltip setup on page load
window.onload = () => {
  const slider = document.getElementById("priceRange");
  updateTooltip(slider);
  initializeProductList();

  // Set up the Apply button to trigger applySelectedFilters function
  const applyButton = document.getElementById("applyButton");
  applyButton.addEventListener("click", applySelectedFilters);
};

// Tooltip Update function
function updateTooltip(slider) {
  const tooltip = document.getElementById("tooltip");
  const rangeContainer = slider.parentElement;
  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const value = parseInt(slider.value);

  const percentage = ((value - min) / (max - min)) * 100;

  const tooltipWidth = tooltip.offsetWidth;
  const containerWidth = rangeContainer.offsetWidth;

  let leftPosition = (percentage / 100) * containerWidth - tooltipWidth / 2;

  if (leftPosition < 0) {
    leftPosition = 0;
  }

  if (leftPosition + tooltipWidth > containerWidth) {
    leftPosition = containerWidth - tooltipWidth;
  }

  tooltip.style.left = `${leftPosition}px`;
  tooltip.textContent = `₹${value}`;
}

let defaultSliderValue;

function initializeProductList() {
  const productList = document.getElementById("productList");
  const products = Array.from(
    productList.getElementsByClassName("product-item")
  );

  originalProducts = products.slice(); // Store original order if needed
  defaultSliderValue = document.getElementById("priceRange").value; // Set default slider value

  // Shuffle products array
  const shuffledProducts = originalProducts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Clear and append shuffled products
  productList.innerHTML = "";
  shuffledProducts.forEach((product) => {
    productList.appendChild(product);
  });
}

// Function to clear all filters
function clearFilters() {
  const slider = document.getElementById("priceRange");
  slider.value = defaultSliderValue; // Reset slider to default
  updateTooltip(slider); // Update tooltip with default slider value

  const ratingCheckbox = document.getElementById("4-stars");
  ratingCheckbox.checked = false; // Uncheck the rating filter

  const categoryCheckboxes = document.querySelectorAll(".filter-checkbox");
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false; // Uncheck all category filters
  });

  const sortOptions = document.querySelectorAll('input[name="sort"]');
  sortOptions.forEach((option) => {
    option.checked = false; // Uncheck all sort options
  });

  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear current product list

  // Shuffle the products randomly
  const shuffledProducts = originalProducts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Append the shuffled products to the product list
  shuffledProducts.forEach((product) => {
    productList.appendChild(product);
  });
}

// New function to apply sorting and filters when the "Apply" button is clicked
function applySelectedFilters() {
  sortItems(); // Apply the selected sorting
  filterProducts(); // Apply the selected filters
}
