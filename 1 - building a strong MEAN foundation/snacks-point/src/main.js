const wishlistItems = [];

for (let index = 1; index <= 6; index++) {
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

      const itemCardElement = document.getElementById(`item-${index}`);
      const itemName = itemCardElement.querySelector("#item-name").innerText;
      const itemPrice = itemCardElement.querySelector("#item-price").innerText;
      const imgSrc = itemCardElement.querySelector(".card-img").src;
      addToWishList(index, itemName, itemPrice, imgSrc);
    }
  });
}

const addToWishList = (id, name, price, imgSrc) => {
  const item = {
    id,
    name,
    price,
    imgSrc,
  };

  wishlistItems.push(item);
  updateItemsCount();
};

const removeFromWishList = (id) => {
  const itemIndex = wishlistItems.findIndex((item) => item.id === id);
  wishlistItems.splice(itemIndex, 1);
  updateItemsCount();
};

const updateItemsCount = () => {
  document.getElementById(
    "cart-items"
  ).innerText = `Cart: ${wishlistItems.length}`;
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

document.getElementById("cart-items").addEventListener("click", gotoCart);
