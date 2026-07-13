function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []
}

function saveCart(cart) {
  return localStorage.setItem("cart", JSON.stringify(cart))
}

function addToCart(item) {
  let cart = getCart()
  let existingItem = cart.find(i => i.id == item.id)

  if (existingItem) {
    existingItem.quantity = item.quantity
  } else {
    cart.push(item)
  }

  saveCart(cart)
}

function removeFromCart(id) {
  let cart = getCart()
  let finalCart = cart.filter((i) => i.id !== id)
  saveCart(finalCart)
}

function resetAllCounters() {
  let counters = document.querySelectorAll(".counter_container")

  counters.forEach(counter => {
    let id = counter.dataset.id
    let originalBtn = document.querySelector(`.add-btn[data-id="${id}"]`)

    if (!originalBtn) {
      let newAddBtn = document.createElement("button")
      newAddBtn.classList.add("add-btn")
      newAddBtn.innerText = "Add"
      newAddBtn.dataset.id = id
      counter.replaceWith(newAddBtn)
      attachAddButtonEvent(newAddBtn)
    }
  })
}

function attachAddButtonEvent(addBtn) {
  addBtn.addEventListener("click", () => {
    let quantity = 1
    let id = addBtn.dataset.id
    let name = addBtn.dataset.name
    let price = Number(addBtn.dataset.price)
    let image = addBtn.dataset.image

    createCounter(addBtn, { id, name, price, image, quantity })
    addToCart({ id, name, price, image, quantity })
    renderSidebar()
  })
}

function createCounter(addBtn, itemData) {
  let quantity = itemData.quantity

  let counterContainer = document.createElement("div")
  counterContainer.classList.add("counter_container")
  counterContainer.dataset.id = itemData.id

  counterContainer.innerHTML = `
    <div class="minus_btn">-</div>
    <p class="item_quantity">${quantity}</p>
    <div class="plus_btn">+</div>
  `

  addBtn.replaceWith(counterContainer)

  let plusBtn = counterContainer.querySelector(".plus_btn")
  let minusBtn = counterContainer.querySelector(".minus_btn")
  let itemQuantity = counterContainer.querySelector(".item_quantity")

  plusBtn.addEventListener("click", () => {
    quantity++
    itemQuantity.innerHTML = quantity
    addToCart({ ...itemData, quantity })
    renderSidebar()
  })

  minusBtn.addEventListener("click", () => {
    quantity--

    if (quantity == 0) {
      removeFromCart(itemData.id)

      let newAddBtn = document.createElement("button")
      newAddBtn.classList.add("add-btn")
      newAddBtn.innerText = "Add"
      newAddBtn.dataset.id = itemData.id
      newAddBtn.dataset.name = itemData.name
      newAddBtn.dataset.price = itemData.price
      newAddBtn.dataset.image = itemData.image

      counterContainer.replaceWith(newAddBtn)
      attachAddButtonEvent(newAddBtn)
    } else {
      itemQuantity.innerHTML = quantity
      addToCart({ ...itemData, quantity })
    }

    renderSidebar()
  })
}

let addBtns = document.querySelectorAll(".add-btn")
addBtns.forEach(btn => attachAddButtonEvent(btn))

function restoreCounters() {
  let cart = getCart()

  cart.forEach(item => {
    let addBtn = document.querySelector(`.add-btn[data-id="${item.id}"]`)
    if (!addBtn) return

    createCounter(addBtn, item)
  })
}

let orderBtn = document.getElementById("orderBtn")
let sidebarContainer = document.querySelector(".sidebar_container")
let closeSidebar = document.querySelector("#sidebar1>button")
let sidebar2 = document.getElementById("sidebar2")
let priceContainer = document.querySelector("#sidebar3>h2>span")

orderBtn.addEventListener("click", () => {
  sidebarContainer.classList.add("active")
  renderSidebar()
})

closeSidebar.addEventListener("click", () => {
  sidebarContainer.classList.remove("active")
})

function renderSidebar() {
  let cart = getCart()

  if (cart.length == 0) {
    sidebar2.innerHTML = `
      <h2 style="text-align:center;margin-top:50px">
        Your Cart is empty
      </h2>`
    priceContainer.innerHTML = "0.00"
    resetAllCounters()
    return
  }

  let total = 0
  sidebar2.innerHTML = ""

  cart.forEach((item) => {
    let totalPriceOfSingleProduct = item.quantity * item.price
    total += totalPriceOfSingleProduct

    sidebar2.innerHTML += `
     <div class="item_container">
        <aside class="item1">
          <img src="${item.image}" alt="${item.name}">
        </aside>
        <aside class="item2">
         <h2>${item.name}</h2>
         <p>Qty: ${item.quantity}</p>
         <p>Price: ₹${item.price}</p>
        </aside>
        <aside class="item3">
         <button data-id="${item.id}">
           <i class="fa-regular fa-trash-can"></i>
         </button>
        </aside>
     </div>
    `
  })

  let deleteBtns = document.querySelectorAll(".item3>button")

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      let id = deleteBtn.dataset.id
      removeFromCart(id)
      renderSidebar()

      let counter = document.querySelector(`.counter_container[data-id="${id}"]`)
      if (counter) {
        let addBtn = document.createElement("button")
        addBtn.classList.add("add-btn")
        addBtn.innerText = "Add"
        addBtn.dataset.id = id
        counter.replaceWith(addBtn)
        attachAddButtonEvent(addBtn)
      }
    })
  })

  priceContainer.innerHTML = total.toFixed(2)
}

let placeOrderBtn = document.getElementById("placeOrderBtn")

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    let cart = getCart()

    if (cart.length == 0) {
      alert("Your cart is empty!")
      return
    }

    let randomOrderId = "ORD" + Math.floor(Math.random() * 1000000)

    alert(`✅ Order Placed Successfully!
Your Order ID: ${randomOrderId}
Thank you for ordering with us!`)

    localStorage.removeItem("cart")
    renderSidebar()
  })
}

renderSidebar()
restoreCounters()