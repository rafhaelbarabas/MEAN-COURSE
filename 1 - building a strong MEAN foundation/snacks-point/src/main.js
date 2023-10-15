const productList = [
  {
    name: "Bacon Pizza",
    price: 44.99,
    img: "../assets/img/pizzas/bacon.jpg",
    category: "Pizza",
    rating: 4.7,
  },
  {
    name: "Chilli pepper Pizza",
    price: 42.1,
    img: "../assets/img/pizzas/chillipeper.jpg",
    category: "Pizza",
    rating: 4.1,
  },
  {
    name: "Marinara pepper Pizza",
    price: 34.99,
    img: "../assets/img/pizzas/marinara.jpg",
    category: "Pizza",
    rating: 3.9,
  },
  {
    name: "Mexican Pizza",
    price: 49.99,
    img: "../assets/img/pizzas/mexican.jpg",
    category: "Pizza",
    rating: 4.3,
  },
  {
    name: "Mozzarella Pizza",
    price: 29.99,
    img: "../assets/img/pizzas/mozzarella.jpg",
    category: "Pizza",
    rating: 4.5,
  },
  {
    name: "Mushroom Pizza",
    price: 59.75,
    img: "../assets/img/pizzas/mushroom.jpg",
    category: "Pizza",
    rating: 5.0,
  },
  {
    name: "Chicken Biryani",
    price: 12.75,
    img: "../assets/img/biryanis/chicken-biryani.jfif",
    category: "Biryani",
    rating: 3.2,
  },
  {
    name: "Baked Chicken",
    price: 18.65,
    img: "../assets/img/chicken/baked.jfif",
    category: "Chicken",
    rating: 4.0,
  },
  {
    name: "Fried Chicken",
    price: (12.9).toFixed(2),
    img: "../assets/img/chicken/fried.jfif",
    category: "Chicken",
    rating: 4.8,
  },
  {
    name: "Bao",
    price: (45.9).toFixed(2),
    img: "../assets/img/chinese/bao.jpg",
    category: "Chinese",
    rating: 4.5,
  },
  {
    name: "Sushi",
    price: 61.35,
    img: "../assets/img/chinese/sushi.jfif",
    category: "Chinese",
    rating: 5.0,
  },
  {
    name: "Panner Red Sauce",
    price: 21.35,
    img: "../assets/img/panner/main.jfif",
    category: "Panner",
    rating: 4.1,
  },
  {
    name: "Panner Green Sauce",
    price: 23.35,
    img: "../assets/img/panner/green.jpg",
    category: "Panner",
    rating: 4.3,
  },
  {
    name: "Kuala Lumpur Special",
    price: 53.35,
    img: "../assets/img/south-indian/kuala.jfif",
    category: "South Indian",
    rating: 4.8,
  },
  {
    name: "Mashed Potatoes",
    price: 13.35,
    img: "../assets/img/south-indian/pogal.jfif",
    category: "South Indian",
    rating: 2.8,
  },
  {
    name: "Egg salad",
    price: 12.99,
    img: "../assets/img/vegetables/egg.jpg",
    category: "Vegetable",
    rating: 3.8,
  },
  {
    name: "Mixed salad (vegan)",
    price: 9.99,
    img: "../assets/img/vegetables/salad.jpg",
    category: "Vegetable",
    rating: 3.2,
  },
];

const updateItemsCount = () => {
  document.getElementById(
    "cart-items"
  ).innerText = `Cart: ${wishlistItems.length}`;
};

let wishlistItems = [];

const items = localStorage.getItem("wishlistItems");
if (items) {
  wishlistItems = JSON.parse(items);
  updateItemsCount();
}

const productListElement = document.getElementById("filtered-product-list");
const itemsFilter = document.querySelector("#filter-menu-items");
const itemsFilterButtons = itemsFilter.querySelectorAll("a");

itemsFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.innerText;
    const filteredProducts = productList.filter(
      (product) => product.category === category
    );
    document.getElementById("selected-category").innerText = category;
    renderProducts(filteredProducts);
  });
});

const renderProducts = (products) => {
  productListElement.innerHTML = "";

  products.forEach((product, index) => {
    console.log(product);
    console.log(index);

    createItemCard(product, index);

    const buttonElement = document.getElementById(`add-to-wishlist-${index}`);

    buttonElement.addEventListener("click", (event) => {
      const elementId = `add-to-wishlist-${index}`;
      let button = document.getElementById(elementId);

      const buttonClassList = button.classList;
      if (buttonClassList.contains("btn-outline-danger")) {
        buttonClassList.remove("btn-outline-danger");
        removeFromWishList(index);
      } else {
        buttonClassList.add("btn");
        buttonClassList.add("btn-outline-danger");

        addToWishList(product);
      }
    });
  });
};

const createItemCard = (product, index) => {
  const mainCol = document.createElement("div");
  mainCol.classList.add("col");
  const card = document.createElement("div");
  card.classList.add("card");
  // card.id = `item-${index}`;

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const ratingButton = document.createElement("button");
  ratingButton.type = "button";
  ratingButton.disabled = true;
  ratingButton.classList.add("btn");
  ratingButton.classList.add("btn-outline-warning");

  const starIconSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-star-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
    />
  </svg>
  `;

  const starIcon = document.createElement("svg");
  starIcon.innerHTML = starIconSvg;

  ratingButton.innerText = product.rating;
  ratingButton.appendChild(starIcon);

  cardHeader.appendChild(ratingButton);

  const wishListButton = document.createElement("a");
  wishListButton.classList.add("btn");
  wishListButton.classList.add("active");

  console.log(wishlistItems);
  console.log(product);
  if (wishlistItems.find((item) => item.name === product.name)) {
    wishListButton.classList.add("btn-outline-danger");
  }

  wishListButton.role = "button";
  wishListButton.id = `add-to-wishlist-${index}`;
  const wishListButtonIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-heart"
      viewBox="0 0 16 16"
    >
      <path
        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
      />
    </svg>
  `;
  const wishlistSvg = document.createElement("svg");
  wishlistSvg.innerHTML = wishListButtonIcon;
  wishListButton.appendChild(wishlistSvg);
  cardHeader.appendChild(wishListButton);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.id = `item-${index}`;

  const img = document.createElement("img");
  img.classList.add("card-img");
  img.src = product.img;
  img.alt = product.name;
  cardBody.appendChild(img);

  const itemName = document.createElement("h5");
  itemName.classList.add("card-title");
  itemName.id = "item-name";
  itemName.innerText = product.name;
  cardBody.appendChild(itemName);

  const itemPrice = document.createElement("p");
  itemPrice.classList.add("card-text");
  itemPrice.id = "item-price";
  itemPrice.innerText = `$ ${product.price}`;
  cardBody.appendChild(itemPrice);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  mainCol.appendChild(card);

  productListElement.appendChild(mainCol);
};

const addToWishList = (product) => {
  wishlistItems.push(product);
  updateItemsCount();
};

const removeFromWishList = (id) => {
  const itemIndex = wishlistItems.findIndex((item) => item.id === id);
  wishlistItems.splice(itemIndex, 1);
  updateItemsCount();
};

const addToLocalStorage = () => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
};

const gotoCart = () => {
  addToLocalStorage();
  window.location.href = "wish-list.html";
};

document
  .getElementById("goto-wishlist-button")
  .addEventListener("click", gotoCart);

document.getElementById("cart-button").addEventListener("click", gotoCart);
