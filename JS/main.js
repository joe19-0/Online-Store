
let categoryNavList = document.querySelector(".category-nav-list")
let categoryBtn = document.querySelector(".category-btn")

categoryBtn.onclick = function () {
    categoryNavList.classList.toggle("active")
}

let cart = document.querySelector(".cart")
let btnOpenCart = document.querySelector('.icon.shop-cart')
let btncloseCart = document.querySelector('.close-cart')
let shopMoreBtn = document.querySelector(".btn-cart.trans-bg")

btnOpenCart.onclick = function () {
    cart.classList.toggle("active")
}
btncloseCart.onclick = function () {
    cart.classList.toggle("active")
}
shopMoreBtn.onclick = function () {
    cart.classList.toggle("active")
}

let openMenuBtn = document.querySelector(".open-menu")
let closeMenuBtn = document.querySelector(".close-menu")
let navLinksDiv = document.querySelector(".nav-links")

openMenuBtn.onclick = function () {
    navLinksDiv.classList.toggle("active")
}

closeMenuBtn.onclick = function () {
    navLinksDiv.classList.toggle("active")
}

fetch('products.json')
.then(function (response) {
    return response.json()
})
.then(function (data) {
    let addToCartBtns = document.querySelectorAll(".btn-add-cart")

    addToCartBtns.forEach(function (btn) {
        btn.onclick = function (e) {
            let productId = e.target.getAttribute("data-id")
            let selectedProduct = data.find(function (product) {
                return product.id == productId
            })
            
            addToCart(selectedProduct)
            
            let allMatchingBtns = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`)
            
            allMatchingBtns.forEach(function (matchBtn) {
                matchBtn.classList.add("active")
                matchBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`
            })
        }
    })
})

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    cart.push({...product, quantity: 1})
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart()
}

function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items")
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    let checkoutItems = document.getElementById("checkout-items")

    var totalPrc = 0
    var totalCount = 0
    
    let itemsInput = document.getElementById("items")
    let totalPriceInput = document.getElementById("total-price")
    let countItemsInput = document.getElementById("count-items")

    
    
    cartItemsContainer.innerHTML = ""

    if (checkoutItems) {
        checkoutItems.innerHTML = ""
        

        itemsInput.value = ""
        totalPriceInput.value = ""
        countItemsInput.value = ""
    }
    
    cart.forEach(function (item, index) {
        let totalPrice = item.price * item.quantity
        
        totalPrc += totalPrice
        totalCount += item.quantity

        if (itemsInput) {
            itemsInput.value += item.name + " | " + "Price: " + totalPrice + " | " + "Count: " + item.quantity + ".\n"
            countItemsInput.value = totalCount
            totalPriceInput.value = totalPrc + 20
        }
        

        cartItemsContainer.innerHTML += `
            <div class="item-cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price">$${totalPrice}</p>
                    <div class="quantity-control">
                        <button class="dec-quantity" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="inc-quantity" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delete-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `

        if (checkoutItems) {

            checkoutItems.innerHTML += `
                <div class="item-cart">
                    <div class="image-name">
                        <img src="${item.img}" alt="">
                        <div class="content">
                            <h4>${item.name}</h4>
                            <p class="price-cart">$${totalPrice}</p>
                            <div class="quantity-control">
                                <button type="button" class="dec-quantity" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button type="button" class="inc-quantity" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="delete-item del-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `
        }
    })

    let priceCartTotal = document.querySelector(".price-cart-total")
    let countItemCart = document.querySelector(".count-item-cart")
    let countItemHeader = document.querySelector(".count-item-header")
    
    priceCartTotal.textContent = `$ ${totalPrc}`
    countItemCart.textContent = totalCount
    countItemHeader.textContent = totalCount

    if (checkoutItems) {
        let subtotalCheckout = document.querySelector(".subtotal-checkout")
        let shipping = 20
        let totalCheckout = document.querySelector(".total-checkout")

        subtotalCheckout.textContent = `$${totalPrc}`
        totalCheckout.textContent = `$${totalPrc + shipping}`
    }

    let incBtns = document.querySelectorAll(".inc-quantity")
    let decBtns = document.querySelectorAll(".dec-quantity")

    incBtns.forEach(function (incBtn) {
        incBtn.onclick = function (e) {
            let itemIndex = e.target.getAttribute("data-index")
            incQuantity(itemIndex)
        } 
    })

    decBtns.forEach(function (decBtn) {
        decBtn.onclick = function (e) {
            let itemIndex = e.target.getAttribute("data-index")
            decQuantity(itemIndex)
        } 
    })


    let deleteBtns = document.querySelectorAll(".delete-item")

    deleteBtns.forEach(function (deleteBtn) {
        deleteBtn.onclick = function (e) {
            let itemIndex = e.target.closest("button").getAttribute("data-index")

            removeFromCart(itemIndex)
        }
    })

}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    let removeProduct = cart.splice(index, 1)[0]

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart()
    updateBtnsState(removeProduct.id)
}

function updateBtnsState(productId) {
    let allMatchingBtns = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`)
    allMatchingBtns.forEach(function (button) {
        button.classList.remove("active")
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`
    })
}

function incQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    cart[index].quantity += 1
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart()
}

function decQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1
    }
    
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart()
}

updateCart()