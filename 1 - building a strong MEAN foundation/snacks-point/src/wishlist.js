let wishlistItems = [];

const updateItemsCount = () => {
  document.getElementById(
    "cart-items"
  ).innerText = `Cart: ${wishlistItems.length}`;
};

const items = localStorage.getItem("wishlistItems");
if (items) {
  wishlistItems = JSON.parse(items);
  updateItemsCount();
}

const tableBody = document.getElementById("tbody-wishlist");
let itemsSum = 0;

wishlistItems
  .sort((item) => item.id)
  .forEach((item, index) => {
    itemsSum += parseFloat(item.price);
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = index + 1;
    row.append(th);

    const c1 = document.createElement("td");
    c1.id = "div-menu-items";
    const img = document.createElement("img");
    img.setAttribute("src", item.img);

    c1.appendChild(img);

    const c2 = document.createElement("td");
    c2.innerText = item.name;

    const c3 = document.createElement("td");
    c3.innerText = item.price;

    row.append(c1);
    row.append(c2);
    row.append(c3);
    tableBody.appendChild(row);
  });

const total = document.getElementById("total");
total.innerHTML = `Total: $ ${itemsSum.toFixed(2)}`;

document.getElementById("clear-wishlist-button").addEventListener("click", () => {
  const clearList = confirm("Are you sure you want to clear your wishlist?");
  if (!clearList) return;
  localStorage.removeItem("wishlistItems");
  wishlistItems = [];
  tableBody.innerHTML = "";
  total.innerHTML = `Total: $ 0.00`;
  updateItemsCount();
});