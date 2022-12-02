// ----------------------globle ------------
let dom_dialog = document.querySelector('#product-dialog')
let dom_dialog_cart = document.querySelector('#stor-item-comtainer')
let rating_number = []
let products = load_data('products')
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
        if (products[item].currency === 'us') {
            product_price.textContent = '$' + products[item].price;
        }else{
            product_price.textContent = '€' + products[item].price;
        }
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
        btn_buy.addEventListener('click', (e) => {
            let index = e.target.parentElement.parentElement.parentElement.dataset.index;
            buy_items(index)
        });

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

function save_data(element,key) {
    localStorage.setItem(key, JSON.stringify(element));
}
//   -----------------save file------------
function load_data(key) {
    let storage = JSON.parse(localStorage.getItem(key));
    if (storage !== null) {
        return storage;
    }
}
// ---------search-------------
function search_process() {
    let num_found = 0;
    let num_unfound = 0;
    let search_text = search_products.value
    let product_name = document.querySelectorAll(".product-card")
    product_name.forEach(item => {
        num_found++
        let item_text = item.firstElementChild.nextElementSibling.firstElementChild.textContent
        if (item_text.indexOf(search_text) > -1) {
            item.style.display = 'block'

        }else{
            item.style.display = 'none'
            num_unfound++;
        }
    });
    if (num_found === num_unfound) {
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
            dom_button_cacel.addEventListener('click',delete_items)
            item_menu.appendChild(dom_button_cacel);
            let dom_button_buy = document.createElement("button");
            dom_button_buy.className = "buy-store";
            let dom_icon = document.createElement("input");
            dom_icon.type = 'number'
            dom_icon.placeholder = '1'
            dom_icon.id = 'store-item-value'
            dom_icon.value = 1;
            dom_icon.min = '1';
            dom_button_buy.appendChild(dom_icon)
            item_menu.appendChild(dom_button_buy)
            item_cart.appendChild(item_menu);
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
    let new_cart_add = {}
    new_cart_add.title = products[index_editor].title
    new_cart_add.price = products[index_editor].price
    new_cart_add.currency = products[index_editor].currency
    new_cart_add.desciption = products[index_editor].desciption
    new_cart_add.photo = products[index_editor].photo
    new_cart_add.index = index_editor
    if (numbers_add === 0) {
        add_items.push(new_cart_add)
        save_data(add_items,'add_items')
        numbers_add++
        save_data(numbers_add,'numbers_add')
        alert_message('success','Add product successfully')
    } else {
        let check = true
        for (let i in add_items) {
            if (add_items[i].title === new_cart_add.title) {
                check = false
            }
        }
        if (check){
            add_items.push(new_cart_add)
            save_data(add_items,'add_items')
            numbers_add++
            save_data(numbers_add,'numbers_add')
            alert_message('success','Add product successfully')
        }else {
            alert_message('warning','You Already add this product to your cart')
        }
    }
}
function alert_message(incon,message) {
    Swal.fire({
        position: 'center',
        icon: incon,
        title: message,
        showConfirmButton: false,
        timer: 1000
      })
}
function alert_message_button(message) {
    Swal.fire(
        message,
        'You clicked the button!',
        'success'
      )
}
// function login_process(){
//     hide(document.querySelector('#form-login-container'))
//     let seller_page =document.querySelector('#seller-login')
//     let new_account = {}
//     new_account['gamil'] = document.querySelector('#user-gmail').value
//     new_account['password'] = document.querySelector('#user-password').value
//     new_account['roles'] = 'user'
//     new_account['name'] = document.querySelector('#user-name').value
//     new_account['image'] = document.querySelector('#user-image').value
//     for (let index in accounts){
//         if (accounts[index].gamil === new_account['gamil'] && accounts[index].password === new_account['password']) {
//             user_login++;
//         }else if (new_account['gamil'] !== '' && new_account.password !== '' && new_account.image !== '' && new_account.name !== ''){
//             accounts.push(new_account)
//             user_login++;
//         }
//         hide(nav_account)
//         show(seller_page)
//         // show(document.querySelector('#seller-login'))

//     }

// }

// function check_login (){
//     if (user_login > 0) {
//         console.log(user_login)
//     }else{
//         show(document.querySelector('#form-login-container'))
//     }
// }
function buy_items (index) {
    show(dom_credit_card)
    let credit_title = document.querySelector('.credit-title').firstElementChild
    credit_title.textContent = products[index].title
    let product_image = document.querySelector('.product-image').firstElementChild
    product_image.src = products[index].photo
    document.querySelector('.quantity-container').style.display = 'flex';
    ///price
    let price_type = '$'
    if (products[index].currency === 'euro') {
        price_type = '€'
    }
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = price_type + products[index].price
    let dom_select = document.querySelector('select')
    dom_select.addEventListener('click', (e) => {
        calculator_quantity(dom_select.value,products[index].price,price_type)
    });
    let commission=document.querySelector('.total-price-container').lastElementChild
    commission.textContent = price_type + products[index].price
    let ratting_us = document.querySelector('.ratting-stars').querySelectorAll('span');
    ratting_us.forEach(span => {
        span.addEventListener('click', (e) => {
            ratting_process(span.dataset.index,index)
        });
    })

}
function ratting_process(num_ratting,index){
    let ratting_us = document.querySelector('.ratting-stars').querySelectorAll('span');
    ratting_us.forEach(span => {
        if (span.dataset.index <= num_ratting) {
            span.style.color = 'orange';
        }else{
            span.style.color = 'black';
        }
    })
    rating_number[index]++;
    let all_star = products[index].totail_star
    let new_totail_star =   Number(all_star) + Number(num_ratting)
    let new_ratting =  new_totail_star / rating_number[index]
    products[index].rating = Math.round(new_ratting) ;
    products[index].totail_star =  new_totail_star;
    save_data(products,'products')
    save_data(rating_number,'rating_number')
}

function buy_all_items () {
    let credit_title = document.querySelector('.credit-title').firstElementChild
    credit_title.textContent = 'Package';
    let product_image = document.querySelector('.product-image').firstElementChild
    product_image.src = 'https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843__480.png'
    document.querySelector('.quantity-container').style.display = 'none';
    let commission=document.querySelector('.total-price-container').lastElementChild
    commission.textContent = 'none'
    let dom_value_store =document.querySelectorAll('#store-item-value')
    let total_price = 0
    let num = 0
    dom_value_store.forEach(item => {
        ///euro to us 
        if (item.parentElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.textContent === 'euro') {
            let euro = 1.05
            let total_euro = add_items[num].price * euro
            total_price += total_euro * item.value
            num++
            console.log('log')
        }else {
            total_price += item.value * add_items[num].price
            num++
        }
    })
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = '$'+ total_price
}
function calculator_quantity (quantity,price,price_type){
    let calculator = quantity * price 
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = price_type + calculator
}
function delete_items(event) {
    let index = event.target.parentElement.parentElement.dataset.index;
    add_items.splice(index, 1);
    numbers_add -= 1;
    save_data(add_items,'add_items')
    save_data(numbers_add,'numbers_add')
    render_item_cart()
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
// let nav_account = document.querySelector('#nav-acc')
// nav_account.addEventListener('click',check_login)

let btn_buy = document.querySelector('#buy-on-detail')
btn_buy.addEventListener('click', (e) => {
    buy_items(index_editor)
});
let dom_credit_card = document.querySelector('#credit-card')
let dom_btn_buy_all = document.querySelector('#store-buy');
dom_btn_buy_all.addEventListener('click', (e) => {
    hide(dom_dialog_cart)
    show(dom_credit_card)
    buy_all_items()
});
let dom_payment_cacel = document.querySelector('#payment-cacel');
dom_payment_cacel.addEventListener('click', (e) => {
    hide(dom_credit_card)
});


// save_data(add_items,'add_items')
// save_data(numbers_add,'numbers_add')
add_items = load_data('add_items')
numbers_add = load_data('numbers_add')
rating_number = load_data('rating_number')
rander_product()
