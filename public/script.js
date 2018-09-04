var ShoppingCart = function () {

  // an array with all of our cart items
  let cart = [];

  const totalPrice = function(){
    let total = 0
    for(let i=0;i<cart.length;i++){
      total+=cart[i].price
    }
    return total
  }

  var renderCart = function () {
    $(".cart-list").empty()
    const source = $("#shoppingCart-template").html()
    const template = Handlebars.compile(source)
    let cartItemListHTML = template({item:cart})
    $(".cart-list").append(cartItemListHTML)
    let total = totalPrice()
    $(".total").html(total)
  }


  var addItem = function (item) {
    cart.push(item)
  }

  var clearCart = function () {
    cart = []
  }
  
  return {
    renderCart: renderCart,
    addItem: addItem,
    clearCart: clearCart
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.renderCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  $(".shopping-cart").toggle()
});

$('.add-to-cart').on('click', function () {
  let itemPrice = $(this).closest(".item").data().price
  let itemName = $(this).closest(".item").data().name
  let item = {
    name:itemName, 
    price:itemPrice}
  app.addItem(item);
  app.renderCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.renderCart();
});

