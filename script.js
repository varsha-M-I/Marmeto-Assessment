let cardData = null;
let filteredCardData = [];


let categories = ["Men", "Women", "Kids"];
let selectedCategory = "Men";

let tabsContainer = document.getElementById("tabs");
let cardsContainer = document.getElementById("cards")

async function changeClassName(category) {
    let activeElement = document.querySelector(".activeCategory");
    if (activeElement) {
        activeElement.classList.remove("activeCategory");
    }
    let currentElement = document.getElementById(category);
    currentElement.classList.add("activeCategory");
    selectedCategory = category;
    filteredCardData = cardData?.categories.filter(e => e.category_name === selectedCategory);
    updateCards()
}

function updateCards() {
    cardsContainer.innerHTML = "";
    if (filteredCardData && filteredCardData.length > 0) {
        filteredCardData[0].category_products.forEach(card => {

            let cardElement = document.createElement("div");
            let badge = document.createElement("div");
            let cardImage = document.createElement("img");
            let addCartButton = document.createElement("button");
            addCartButton.textContent = "Add to Cart"
            addCartButton.className = "addToCart";

            let imageTitleContainer = document.createElement("div");
            imageTitleContainer.id = "imageTitleContainer"
            let imageTitle = document.createElement("span");
            imageTitle.id = "imageTitle"
            imageTitle.textContent = card.title;
            let vendorText = document.createElement("span");
            vendorText.textContent = `• ${card.vendor}`;
            vendorText.className = "vendor"
            imageTitleContainer.appendChild(imageTitle);
            imageTitleContainer.appendChild(vendorText);

            let priceContainer = document.createElement("div");
            priceContainer.className = "priceContainer"
            let discountedPrice = document.createElement("span");
            discountedPrice.textContent = `Rs ${parseFloat(card.price).toFixed(2)}`;
            let originalPrice = document.createElement("span");
            originalPrice.textContent = card.compare_at_price;
            originalPrice.className = "originalPrice"
            let discountedPercentage = document.createElement("span");
            discountedPercentage.className = "discount";
            discountedPercentage.textContent = `${parseInt(((card.compare_at_price - card.price) / card.compare_at_price) * 100)}% OFF`
            priceContainer.appendChild(discountedPrice);
            priceContainer.appendChild(originalPrice);
            priceContainer.appendChild(discountedPercentage);


            cardImage.src = card.image;
            cardImage.alt = card.title;
            cardImage.className = "image";

            badge.innerHTML = card.badge_text;
            badge.className = "badge_text";
            if (card.badge_text) {
                cardElement.appendChild(badge);
            }

            cardElement.appendChild(cardImage);

            cardElement.className = "card";
            cardElement.appendChild(imageTitleContainer);
            cardElement.appendChild(priceContainer);
            cardElement.appendChild(addCartButton);


            cardsContainer.appendChild(cardElement);
        });
    }
}

categories.forEach(category => {
    let tab = document.createElement("button");
    tab.className = `tab ${selectedCategory === category ? "activeCategory" : ""}`;
    tab.id = category;
    tab.textContent = category;
    tab.addEventListener("click", () => changeClassName(category));
    tabsContainer.appendChild(tab);
});

async function loadProducts() {
    const res = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json");
    const response = await res.json();
    if (response) {
        cardData = response;
        filteredCardData = response?.categories.filter(e => e.category_name === selectedCategory);
        updateCards()
    }

}

loadProducts();
