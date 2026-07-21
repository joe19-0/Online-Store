fetch('products.json')
.then(function (response) {
    return response.json()
})
.then(function (data) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    const swiperItemsSale = document.getElementById("swiper-items-sale")
    const swiperItemsElec = document.getElementById("swiper-items-elec")
    const swiperItemsApp = document.getElementById("swiper-items-app")
    const swiperItemsMob = document.getElementById("swiper-items-mob")
    
    data.forEach(function (product) {
        let isInCart = cart.some(function (cartItem) {
            return cartItem.id === product.id
        })

        if (product.oldPrice) {
            const percentDisc = Math.floor((product.oldPrice - product.price) / product.oldPrice * 100)

            swiperItemsSale.innerHTML += `
                <div class="swiper-slide product">
                        <span class="sale-present">%${percentDisc}</span>
                        <div class="img-product">
                            <a href="#"><img src="${product.img}" alt=""></a>
                        </div>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p class="name-product"><a href="#">${product.name}</a></p>
                        <div class="price">
                            <p><span>$${product.price}</span></p>
                            <p class="old-price">$${product.oldPrice}</p>
                        </div>
                        <div class="icons">
                            <span class="btn-add-cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "add to cart"}
                            </span>
                            <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
            `
        }

        if (product.catetory === "electronics") {

            const oldPricePar = product.oldPrice ? `<p class="old-price">$${product.oldPrice}</p>` : ""
            const percentDisc = Math.floor((product.oldPrice - product.price) / product.oldPrice * 100)
            const percentDiscDiv = product.oldPrice ? `<span class="sale-present">%${percentDisc}</span>` : ""


            swiperItemsElec.innerHTML += `
                <div class="swiper-slide product">
                    ${percentDiscDiv}
                    <div class="img-product">
                        <a href="#"><img src="${product.img}" alt=""></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name-product"><a href="#">${product.name}</a></p>
                    <div class="price">
                        <p><span>$${product.price}</span></p>
                        ${oldPricePar}
                    </div>
                    <div class="icons">
                        <span class="btn-add-cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "add to cart"}
                        </span> 
                        <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                    </div>
                </div>
            `
        }
        
        if (product.catetory === "appliances") {

            const oldPricePar = product.oldPrice ? `<p class="old-price">$${product.oldPrice}</p>` : ""
            const percentDisc = Math.floor((product.oldPrice - product.price) / product.oldPrice * 100)
            const percentDiscDiv = product.oldPrice ? `<span class="sale-present">%${percentDisc}</span>` : ""

            swiperItemsApp.innerHTML += `
                <div class="swiper-slide product">
                    ${percentDiscDiv}
                    <div class="img-product">
                        <a href="#"><img src="${product.img}" alt=""></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name-product"><a href="#">${product.name}</a></p>
                    <div class="price">
                        <p><span>$${product.price}</span></p>
                        ${oldPricePar}
                    </div>
                    <div class="icons">
                        <span class="btn-add-cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "add to cart"}
                        </span>
                        <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                    </div>
                </div>
            `
        }

        if (product.catetory === "mobiles") {

            const oldPricePar = product.oldPrice ? `<p class="old-price">$${product.oldPrice}</p>` : ""
            const percentDisc = Math.floor((product.oldPrice - product.price) / product.oldPrice * 100)
            const percentDiscDiv = product.oldPrice ? `<span class="sale-present">%${percentDisc}</span>` : ""

            swiperItemsMob.innerHTML += `
                <div class="swiper-slide product">
                    ${percentDiscDiv}
                    <div class="img-product">
                        <a href="#"><img src="${product.img}" alt=""></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name-product"><a href="#">${product.name}</a></p>
                    <div class="price">
                        <p><span>$${product.price}</span></p>
                        ${oldPricePar}
                    </div>
                    <div class="icons">
                        <span class="btn-add-cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "add to cart"}
                        </span>
                        <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                    </div>
                </div>
            `
        }  
    })
})