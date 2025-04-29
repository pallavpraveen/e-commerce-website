// console.clear();

let contentTitle;

console.log(document.cookie);

// Fashion Haven Product Loader

/**
 * Product rendering utilities
 * Creates product cards dynamically based on API data
 */

// Track cart items in browser storage
const checkCartItems = () => {
  if (document.cookie.indexOf(",counter=") >= 0) {
    let counter = document.cookie.split(",")[1].split("=")[1];
    document.getElementById("badge").innerHTML = counter;
  }
};

// Card component generator
function createProductCard(product) {
  // Create main card container
  const cardContainer = document.createElement("div");
  cardContainer.className = "product-card";
  cardContainer.id = "product-" + product.id;

  // Product link and image
  const productLink = document.createElement("a");
  productLink.href = "/contentDetails.html?" + product.id;
  productLink.className = "product-link";
  
  const productImage = document.createElement("img");
  productImage.src = product.preview;
  productImage.alt = product.name;
  productImage.className = "product-image";
  
  // Product details section
  const detailsSection = document.createElement("div");
  detailsSection.className = "product-details";
  
  // Product title
  const productTitle = document.createElement("h3");
  productTitle.textContent = product.name;
  productTitle.className = "product-title";
  
  // Brand name
  const brandName = document.createElement("h4");
  brandName.textContent = product.brand;
  brandName.className = "brand-name";
  
  // Price display
  const priceDisplay = document.createElement("h2");
  priceDisplay.textContent = "₹ " + product.price;
  priceDisplay.className = "price-display";
  
  // Assemble the component structure
  cardContainer.appendChild(productLink);
  productLink.appendChild(productImage);
  productLink.appendChild(detailsSection);
  detailsSection.appendChild(productTitle);
  detailsSection.appendChild(brandName);
  detailsSection.appendChild(priceDisplay);
  
  return cardContainer;
}

// Initialize page content
function initializeProductDisplay() {
  // DOM references
  const clothingSection = document.getElementById("containerClothing");
  const accessoriesSection = document.getElementById("containerAccessories");
  
  // Check for existing cart items
  checkCartItems();
  
  // Fetch products from API
  fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      // Sort products into categories
      products.forEach(product => {
        const productCard = createProductCard(product);
        
        if (product.isAccessory) {
          accessoriesSection.appendChild(productCard);
        } else {
          clothingSection.appendChild(productCard);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeProductDisplay);
