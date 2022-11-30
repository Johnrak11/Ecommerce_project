// ----------------------globle ------------
let dom_dialog = document.querySelector('#product-dialog')
let dom_dialog_cart = document.querySelector('#stor-item-comtainer')
let rating_number = []
let products = []
let index_editor = 0
let add_items = []
let numbers_add = 0
let accounts = [{'gamil':'virak.kep22@gmail.com','password':'12345678','roles':'admin','name':'vorak','image':''}]
let user_login = 0

// ------------------function------------------
function rander_product() {
    ///remove product-card-contaier
    document.querySelector('.product-card-contaier').remove();
    //create product to display on screen
    let parent_card_container = document.querySelector('.product-container')
    let card_container = document.createElement('div')
    card_container.className = 'product-card-contaier'
    for (let item in products) {
        // create-card--
        let product_card = document.createElement('div')
        product_card.className = 'product-card'
        product_card.dataset.index = item;

        // ===create-image--
        let product_card_image = document.createElement('div');
        product_card_image.className = 'product-card-image';
        let image = document.createElement('img');
        image.src = products[item].photo
        product_card_image.appendChild(image);
        product_card.appendChild(product_card_image)

        //===create-price--and create title--
        let product_card_text = document.createElement('div');
        product_card_text.className = 'product-card-text';
        //title
        let product_title = document.createElement('h2');
        product_title.textContent = products[item].title;
        product_card_text.appendChild(product_title);
        // price--
        let product_price = document.createElement('label');
        product_price.textContent = products[item].price;
        product_card_text.appendChild(product_price);
        product_card.appendChild(product_card_text)

        //product-card-rating
        let product_card_rating = document.createElement('div');
        product_card_rating.className = 'product-card-rating';
        for (let i = 0; i < 5; i++) {
            let product_card_rating_item = document.createElement('span');
            if (products[item].rating > i) {
                product_card_rating_item.className = 'fa fa-star checked';
            } else {
                product_card_rating_item.className = 'fa fa-star';
            }
            product_card_rating.appendChild(product_card_rating_item)
        }
        product_card.appendChild(product_card_rating)
        // button--
        let btn_card_container = document.createElement('div');
        btn_card_container.className = 'btn-card-container';
        btn_card_container.style.display = 'none';
        // button --buy--
        let btn_card_buy = document.createElement('div');
        btn_card_buy.className = 'btn-card-buy';
        let btn_buy = document.createElement('button');
        btn_buy.id = 'buy'
        btn_buy.textContent = 'Buy';
        btn_card_buy.appendChild(btn_buy);
        btn_buy.addEventListener('click', check_login)

        let btn_card_detail = document.createElement('div');
        btn_card_detail.className = 'btn-card-detail';
        let btn_detail = document.createElement('button');
        btn_detail.id = 'detail'
        btn_detail.textContent = 'Detail';
        btn_card_detail.appendChild(btn_detail);
        btn_detail.addEventListener('click', detail_process)

        //append btn
        btn_card_container.appendChild(btn_card_buy);
        btn_card_container.appendChild(btn_card_detail);
        product_card.appendChild(btn_card_container);

        // -----hover-------------
        let dom_product_card = product_card
        let dom_btn_card_container = btn_card_container
        dom_product_card.addEventListener('mouseover', (e) => {
            show(dom_btn_card_container)
        });
        dom_product_card.addEventListener('mouseout', (e) => {
            hide(dom_btn_card_container)

        });
        // append card to cantainer--
        card_container.appendChild(product_card)
    }
    parent_card_container.appendChild(card_container)
}
// hide and show---
function hide(element) {
    element.style.display = 'none'
}
function show(element) {
    element.style.display = 'block'
}
//   -----------------save file------------

function save_data() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("rating_number", JSON.stringify(rating_number));
}
//   -----------------save file------------
function load_data() {
    let products_storage = JSON.parse(localStorage.getItem("products"));
    let rating_storage = JSON.parse(localStorage.getItem("products"));
    if (products_storage !== null) {
        products = products_storage;
        rating_number = rating_storage
    }
}
// ---------search-------------
function search_process() {
    let num_found = 0;
    let search_text = search_products.value
    let product_name = document.querySelectorAll(".product-card")
    product_name.forEach(item => {
        let item_text = item.firstElementChild.nextElementSibling.firstElementChild.textContent
        let is_found = true
        if (item_text.length > search_text.length) {
            for (let character in search_text) {
                if (search_text[character].toLocaleLowerCase() !== item_text[character].toLocaleLowerCase()) {
                    is_found = false
                }
            }
            if (!is_found) {
                item.style.display = 'none'
            } else {
                num_found++;
                item.style.display = 'block'
            }
        }
    });
    if (num_found === 0) {
        document.querySelector('.undefind-container').style.display = 'block';
    } else {
        document.querySelector('.undefind-container').style.display = 'none';
    }
}
function detail_process(event) {
    show(dom_dialog)
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    index_editor = index
    let detail_image = document.querySelector('.big_image').firstElementChild
    let detail_name = document.querySelector('.product_name').firstElementChild
    let detail_ratting = document.querySelector('.product_ratting').querySelectorAll('span')
    let detail_currency = document.querySelector('.product_currency').firstElementChild
    let detail_desciption = document.querySelector('.product_desciption').firstElementChild
    let detail_price = document.querySelector('.product_price').firstElementChild
    //change photo
    detail_image.src = products[index].photo
    //change name
    detail_name.textContent = products[index].title
    //change rating
    for (let item in detail_ratting) {
        detail_ratting[item].className = 'fa fa-star'
        if (item < products[index].rating) {
            detail_ratting[item].className = 'fa fa-star checked'
        }
    }
    //change currency
    detail_currency.textContent = 'Currency: ' + products[index].currency
    //change description
    detail_desciption.textContent = 'Desciption: ' + products[index].desciption
    //change price
    detail_price.textContent = 'Price: ' + products[index].price
}
function render_item_cart() {
    let dom_scroll = document.querySelector('.scroll')
    // Remove the card container and create a new one
    document.querySelector("#item-container").remove();
    dom_item_container = document.createElement("div");
    dom_item_container.id = "item-container";
    if (numbers_add !== 0) {
        for (let i in add_items) {
            let item_cart = document.createElement("div");
            item_cart.className = "item_cart";
            item_cart.dataset.index = i;
            // create item left--
            let item_cart_left = document.createElement("div");
            item_cart_left.className = "item_cart_left";
            let dom_img = document.createElement("img");
            dom_img.src = add_items[i].photo;
            let dom_title = document.createElement("h2");
            dom_title.textContent = add_items[i].title;
            item_cart_left.appendChild(dom_img)
            item_cart_left.appendChild(dom_title)
            item_cart.appendChild(item_cart_left)
            // create item center--
            let item_cart_center = document.createElement("div");
            item_cart_center.className = "item_cart_center";
            let dom_price = document.createElement("span");
            dom_price.textContent = add_items[i].price;
            let dom_currency = document.createElement("span");
            dom_currency.textContent = add_items[i].currency;
            item_cart_center.appendChild(dom_price)
            item_cart_center.appendChild(dom_currency)
            item_cart.appendChild(item_cart_center)
            // create item right--
            let item_cart_right = document.createElement("div");
            item_cart_right.className = "item_cart_right";
            let dom_desciption = document.createElement("span");
            dom_desciption.textContent = add_items[i].desciption;
            item_cart_right.appendChild(dom_desciption)
            item_cart.appendChild(item_cart_right)
            // create item menu
            let item_menu = document.createElement("menu");
            let dom_button_cacel = document.createElement("button");
            dom_button_cacel.className = "remove-store";
            dom_button_cacel.textContent = 'Cacel';
            // dom_button_cacel.addEventListener('click',')
            item_menu.appendChild(dom_button_cacel);
            let dom_button_buy = document.createElement("button");
            dom_button_buy.className = "buy-store";
            let dom_icon = document.createElement("i");
            dom_icon.className = "fa fa-shopping-cart";
            dom_button_buy.addEventListener('click', check_login);
            dom_button_buy.appendChild(dom_icon)
            item_menu.appendChild(dom_button_buy)
            item_cart.appendChild(item_menu)
            // dom_button.addEventListener('click',')
            dom_item_container.appendChild(item_cart)
        }
        dom_scroll.appendChild(dom_item_container)
    } else {
        let item_cart = document.createElement("div");
        item_cart.className = "undefind-cart";
        //create h2
        let dom_h2 = document.createElement("h2");
        dom_h2.textContent = "Not Found";
        item_cart.appendChild(dom_h2)
        dom_item_container.appendChild(item_cart)
        dom_scroll.appendChild(dom_item_container)

    }

}
function add_card() {
    numbers_add++
    let new_cart_add = {}
    new_cart_add.title = products[index_editor].title
    new_cart_add.price = products[index_editor].price
    new_cart_add.currency = products[index_editor].currency
    new_cart_add.desciption = products[index_editor].desciption
    new_cart_add.photo = products[index_editor].photo
    if (numbers_add <= 1) {
        add_items.push(new_cart_add)
        alert('Add this product to your cart')
    } else {
        for (let i in add_items) {
            if (add_items[i].title !== new_cart_add.title) {
                add_items.push(new_cart_add)
                alert('Add this product to your cart')
            } else {
                alert('You Already add this product to your cart')
            }
        }
    }
}

function login_process(){
    hide(document.querySelector('#form-login-container'))
    let seller_page =document.querySelector('#seller-login')
    let new_account = {}
    new_account['gamil'] = document.querySelector('#user-gmail').value
    new_account['password'] = document.querySelector('#user-password').value
    new_account['roles'] = 'user'
    new_account['name'] = document.querySelector('#user-name').value
    new_account['image'] = document.querySelector('#user-image').value
    for (let index in accounts){
        if (accounts[index].gamil === new_account['gamil'] && accounts[index].password === new_account['password']) {
            show(seller_page)
            user_login++;
            hide(nav_account)
            show(document.querySelector('#profile'))
        }else if (new_account['gamil'] !== '' && new_account.password !== '' && new_account.image !== '' && new_account.name !== ''){
            accounts.push(new_account)
            user_login++;
            hide(nav_account)
            show(document.querySelector('#profile'))
        }
    }

}

function check_login (){
    if (user_login > 0) {
        console.log(user_login)
    }else{
        show(document.querySelector('#form-login-container'))
    }
}
// ------------------------click----------------------
let search_products = document.querySelector(".search-container").firstElementChild.nextElementSibling;
search_products.addEventListener('keyup', search_process)

let dom_cancel_detail = document.querySelector('.cancel').firstElementChild
dom_cancel_detail.addEventListener('click', (e) => {
    hide(dom_dialog)
});
let dom_stort_item = document.querySelector('.stort-item')
dom_stort_item.addEventListener('click', (e) => {
    show(dom_dialog_cart)
    render_item_cart()
});
let dom_store_cacel = document.querySelector('#store-cacel')
dom_store_cacel.addEventListener('click', (e) => {
    hide(dom_dialog_cart)
});
let nav_account = document.querySelector('#nav-acc')
nav_account.addEventListener('click',check_login)

load_data()
rander_product()
