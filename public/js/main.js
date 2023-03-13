const socket = io();

function newCard(product) {
  return `<div class="card m-3" style="width: 18rem;">
    <img src="${product.thumbnail}" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title">${product.product}</h3>
      <h5 class="card-title">$ ${product.price}</h5>
      <a href="#" class="btn btn-primary">Add to cart</a>
    </div>
  </div>`;
}

socket.on("products", (products) => {
    const cards = products.slice(0, 9).map((product)=> newCard(product)).join(" ");
    document.getElementById("products").innerHTML = cards;
});