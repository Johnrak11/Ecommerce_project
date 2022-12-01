// ----------------------globle ------------
let dom_dialog = document.querySelector('#product-dialog')
let dom_dialog_cart = document.querySelector('#stor-item-comtainer')
let rating_number = []
let products = [{ 'title': 'jim', 'price': '65', 'rating': rating_number[0], 'photo': 'https://technext.github.io/famms/images/p1.png', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'T-shirt', 'price': '65', 'rating': rating_number[2], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'gan', 'price': '65', 'rating': rating_number[3], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'nis', 'price': '65', 'rating': rating_number[4], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'get', 'price': '65', 'rating': rating_number[5], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'no', 'price': '65', 'rating': rating_number[6], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'no', 'price': '65', 'rating': rating_number[6], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
]
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
        alert('Add this products to your cart')
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
            alert('Add this product to your cart')
        }else {
            alert('You Already add this product to your cart')
        }
    }
}

function buy_items (index) {
    show(dom_credit_card)
    let credit_title = document.querySelector('.credit-title').firstElementChild
    credit_title.textContent = products[index].title
    let product_image = document.querySelector('.product-image').firstElementChild
    product_image.src = products[index].photo
    document.querySelector('.quantity-container').style.display = 'flex';
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = '$'+ products[index].price
    let dom_select = document.querySelector('select')
    dom_select.addEventListener('click', (e) => {
        calculator_quantity(dom_select.value,products[index].price)
    });
    let commission=document.querySelector('.total-price-container').lastElementChild
    commission.textContent = '$' + products[index].price
}
function calculator_quantity (quantity,price){
    let calculator = quantity * price 
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = '$'+ calculator
}

// ------------------------click----------------------
let dom_cancel_detail = document.querySelector('.cancel').firstElementChild
dom_cancel_detail.addEventListener('click', (e) => {
    hide(dom_dialog)
});
let btn_buy = document.querySelector('#buy-on-detail')
btn_buy.addEventListener('click', (e) => {
    buy_items(index_editor)
});
let dom_credit_card = document.querySelector('#credit-card')
let dom_payment_cacel = document.querySelector('#payment-cacel');
dom_payment_cacel.addEventListener('click', (e) => {
    hide(dom_credit_card)
});


// save_data(add_items,'add_items')
// save_data(numbers_add,'numbers_add')
rander_product()
