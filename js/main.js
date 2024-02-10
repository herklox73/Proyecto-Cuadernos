(function ($) {
  "use strict";

  const cart = {
    items: [],
    total: 0,
  };

  const selectedProduct = {
    type: "Notebook",
    option: null,
    image: {
      Notebook: {
        original: "img/arkana_notebook_original.jpg",
        red: "img/arkana_notebook_red_md.jpg",
        blue: "img/arkana_notebook_blue_md.jpg",
        black: "img/arkana_notebook_black_md.jpg",
        texture1: "img/arkana_notebook_t1_md.jpg",
        texture2: "img/arkana_notebook_t2_md.jpg",
        texture3: "img/arkana_notebook_t3_md.jpg",
      },
      Agenda: {
        original: "img/arkana_agenda_original.jpg",
        red: "img/arkana_agenda_red_md.jpg",
        blue: "img/arkana_agenda_blue_md.jpg",
        black: "img/arkana_agenda_black_md.jpg",
        texture1: "img/arkana_agenda_t1_md.jpg",
        texture2: "img/arkana_agenda_t2_md.jpg",
        texture3: "img/arkana_agenda_t3_md.jpg",
      },
    },
    prices: {
      Notebook: {
        original: 1.0,
        red: 1.25,
        blue: 1.25,
        black: 1.25,
        texture1: 2.0,
        texture2: 2.0,
        texture3: 2.0,
      },
      Agenda: {
        original: 1.5,
        red: 1.75,
        blue: 1.75,
        black: 1.75,
        texture1: 2.5,
        texture2: 2.5,
        texture3: 2.5,
      },
    },
  };

  function setProductType(type) {
    selectedProduct.type = type;
    updateProduct();
    updatePrice();
  }

  function selectOption(option) {
    selectedProduct.option = option;
    updateProduct();
    updatePrice();
  }

  function updateProduct() {
    const type = selectedProduct.type;
    const option = selectedProduct.option;
    const imgchange = document.getElementById("imgchange");

    if (!option || option === "original") {
      imgchange.src = selectedProduct.image[type]["original"];
      imgchange.style.backgroundImage = "none";
    } else {
      imgchange.src = selectedProduct.image[type][option];
      imgchange.style.backgroundImage = `url('${selectedProduct.image[type][option]}')`;
    }
  }

  function updatePrice() {
    const type = selectedProduct.type;
    const option = selectedProduct.option;
    const price = selectedProduct.prices[type][option];

    const priceElement = document.getElementById("price");
    priceElement.textContent = `Precio: ${price} USD`;
  }

  function addToCart(product, quantity = 1) {
    const existingProduct = cart.items.find(
      (item) => item.type === product.type && item.option === product.option
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }

    updateCart();

    // Display success message using Swal.fire
    Swal.fire({
      icon: "success",
      title: "Agregado",
      timer: 2500,
      showConfirmButton: false,
    });

    // Muestra la barra lateral
    toggleSidebar();

    // Muestra la imagen del producto en la barra lateral
    const sidebarImg = document.getElementById("sidebarImg");
    sidebarImg.src =
      selectedProduct.image[selectedProduct.type][selectedProduct.option];
  }

  function updateCart() {
    const cartContainer = document.getElementById("cartContainer");
    const totalElement = document.getElementById("cartTotal");

    cartContainer.innerHTML = "";
    cart.total = 0;

    cart.items.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      const itemName = `${item.type} - ${item.option} - Precio: ${item.price} USD`;
      const itemQuantity = ` - Cantidad: ${item.quantity}`;

      const increaseButton = document.createElement("button");
      const reduceButton = document.createElement("button");
      increaseButton.className = "increase-item btn btn-success mb-3";
      reduceButton.className = "increase-item btn btn-warning mb-3";

      reduceButton.innerHTML = '<i class="fa fa-minus"></i>';
      increaseButton.innerHTML = '<i class="fas fa-plus"></i>';

      reduceButton.addEventListener("click", () => reduceFromCart(item));
      increaseButton.addEventListener("click", () => increaseFromCart(item));
      // Aplica margen derecho al botón de "Reducir"
      reduceButton.style.marginRight = "10px";

      cartItem.textContent = itemName + itemQuantity;
      cartItem.appendChild(increaseButton);
      cartItem.appendChild(reduceButton);

      cartContainer.appendChild(cartItem);

      cart.total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: ${cart.total.toFixed(2)} USD`;
  }

  function reduceFromCart(product) {
    const index = cart.items.findIndex(
      (item) => item.type === product.type && item.option === product.option
    );
    cart.items[index].quantity -= 1;

    if (cart.items[index].quantity == 0) cart.items.splice(index, 1);

    updateCart();
  }

  function increaseFromCart(product, quantity = 1) {
    const index = cart.items.findIndex(
      (item) => item.type === product.type && item.option === product.option
    );

    if (index !== -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }
    updateCart();
  }

  function confirmPurchase() {
    const confirmed = window.confirm("¿Deseas confirmar la compra?");
    if (confirmed) {
      alert("¡Compra realizada con éxito!");
      cart.items = [];
      updateCart();
    }
  }

  // Función para mostrar u ocultar la barra lateral
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
  }

  // Event listeners
  let notebookBtn = document.getElementById("notebookBtn");
  let agendaBtn = document.getElementById("agendaBtn");
  let redBtn = document.getElementById("red");
  let blueBtn = document.getElementById("blue");
  let blackBtn = document.getElementById("black");
  let texture1Btn = document.getElementById("texture1");
  let texture2Btn = document.getElementById("texture2");
  let texture3Btn = document.getElementById("texture3");
  let imgchange = document.getElementById("imgchange");
  let addToCartBtn = document.getElementById("addToCartBtn");
  let checkoutBtn = document.getElementById("checkoutBtn");

  notebookBtn.addEventListener("click", function () {
    setProductType("Notebook");
  });

  agendaBtn.addEventListener("click", function () {
    setProductType("Agenda");
  });

  redBtn.addEventListener("click", function () {
    selectOption("red");
  });

  blueBtn.addEventListener("click", function () {
    selectOption("blue");
  });

  blackBtn.addEventListener("click", function () {
    selectOption("black");
  });

  texture1Btn.addEventListener("click", function () {
    selectOption("texture1");
  });

  texture2Btn.addEventListener("click", function () {
    selectOption("texture2");
  });

  texture3Btn.addEventListener("click", function () {
    selectOption("texture3");
  });

  addToCartBtn.addEventListener("click", function () {
    const currentProduct = {
      type: selectedProduct.type,
      option: selectedProduct.option,
      price:
        selectedProduct.prices[selectedProduct.type][selectedProduct.option],
    };
    addToCart(currentProduct);
  });

  checkoutBtn.addEventListener("click", function () {
    confirmPurchase();
  });

  // Event listener para el botón de cerrar la barra lateral
  let closeSidebarBtn = document.getElementById("closeSidebarBtn");
  closeSidebarBtn.addEventListener("click", function () {
    toggleSidebar(); // Oculta la barra lateral al hacer clic en el botón de cerrar
  });

  // Initial cart update
  updateCart();
})(jQuery);
