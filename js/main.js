// ----------------------globle ------------
let dom_dialog = document.querySelector('#product-dialog')
let dom_dialog_cart = document.querySelector('#stor-item-comtainer')
let rating_number = []
let products = load_data('products')
let index_editor = 0
let add_items = []
let numbers_add = 0
// ------------------function------------------
function rander_product() {
    ///remove product-card-contaier
    document.querySelector('.product-card-contaier').remove();
    //create product to display on screen
    let parent_card_container = document.querySelector('.product-container')
    let card_container = document.createElement('div')
    card_container.className = 'product-card-contaier'
    let number_product = 8
    if (products.length < 8) {
        number_product = products.length
    }
    for (let item = 0 ; item < number_product; item++) {
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
        } else {
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

        // button--container
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

        //btn_card_detail
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

// hide element and show---
function hide(element) {
    element.style.display = 'none'
}

// show- element --
function show(element) {
    element.style.display = 'block'
}
//   -----------------save file------------

//   -----------------save file------------
function save_data(element, key) {
    localStorage.setItem(key, JSON.stringify(element));
}

//   -----------------load_file------------
function load_data(key) {
    let storage = JSON.parse(localStorage.getItem(key));
    if (storage !== null) {
        return storage;
    }
}
// ---------search-------------

//detail
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
    let currency_detail = '€'
    if (products[index].currency === 'us'){
        currency_detail = '$'
    }
    detail_price.textContent = 'Price: ' + products[index].price + currency_detail
}

//add_card
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
        save_data(add_items, 'add_items')
        numbers_add++
        save_data(numbers_add, 'numbers_add')
        alert_message('success', 'Add product successfully')
    } else {
        let check = true
        for (let i in add_items) {
            if (add_items[i].title === new_cart_add.title) {
                check = false
            }
        }
        if (check) {
            add_items.push(new_cart_add)
            save_data(add_items, 'add_items')
            numbers_add++
            save_data(numbers_add, 'numbers_add')
            alert_message('success', 'Add product successfully')
        } else {
            alert_message('warning', 'You Already add this product to your cart')
        }
    }
}

//buy_only_one item
function buy_items(index) {
    clear_payment()
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
        calculator_quantity(dom_select.value, products[index].price, price_type)
    });
    let commission = document.querySelector('.total-price-container').lastElementChild
    commission.textContent = price_type + products[index].price
    let ratting_us = document.querySelector('.ratting-stars').querySelectorAll('span');
    ratting_us.forEach(span => {
        span.addEventListener('click', (e) => {
            ratting_process(span.dataset.index, index)
        });
    })
    let dom_check_out_submit = document.querySelector('#make-payment')
    dom_check_out_submit.addEventListener('click', (e) => {
        if (validate_credit_card()) {
            hide(dom_credit_card)
            rander_product()
        }
    });
}
//ratting stars
function ratting_process(num_ratting, index) {
    let ratting_us = document.querySelector('.ratting-stars').querySelectorAll('span');
    ratting_us.forEach(span => {
        if (span.dataset.index <= num_ratting) {
            span.style.color = 'orange';
        } else {
            span.style.color = 'black';
        }
    })
    rating_number[index]++;
    let all_star = products[index].totail_star
    let new_totail_star = Number(all_star) + Number(num_ratting)
    let new_ratting = new_totail_star / rating_number[index]
    products[index].rating = Math.round(new_ratting);
    products[index].totail_star = new_totail_star;
    save_data(products, 'products')
    save_data(rating_number, 'rating_number')
}

function calculator_quantity(quantity, price, price_type) {
    let calculator = quantity * price
    let dom_total = document.querySelector('#total').lastElementChild
    dom_total.textContent = price_type + calculator
}
//validate_credit_card container
function validate_credit_card() {
    let is_found = true
    let dom_contect = document.querySelector('#gmail-check-out')
    let dom_location = document.querySelector('#location-check-out')
    let dom_name = document.querySelector('#name-check-out')
    let dom_number = document.querySelector('#number-check-out')
    let dom_month_year = document.querySelector('#year-check-out')
    let dom_cvv = document.querySelector('#cvv-check-out')
    if (!validate_Email(dom_contect.value)) {
        is_found = false
        alert_message('warning', 'The email address is not valid')
    } else if (!validate_name(dom_name.value)) {
        is_found = false
        alert_message('warning', 'name on card is not correct')
    } else if (!validate_number(dom_number.value)) {
        is_found = false
        alert_message('warning', 'Number on card must be more than 16')
    } else if (!validate_exp(dom_month_year.value)) {
        is_found = false
        alert_message('warning', 'Card is exspire')
    } else if (dom_contect.value === '' &&
        dom_location.value === '' &&
        dom_name.value === '' &&
        dom_number.value === '' &&
        dom_month_year.value === '' &&
        dom_cvv.value === '') {
        is_found = false;
        alert_message('warning', 'invalid input')
    } else {
        alert_message('success', 'payment success')
    }
    return is_found
}

//gmail validation from www.programiz.com
function validate_Email(email_id) {
    let is_found = false
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex_pattern.test(email_id)) {
        is_found = true;
    }
    return is_found;
}
function validate_name(name_id) {
    if (name_id !== '') {
        return (name_id[0] === name_id[0].toUpperCase())
    }
}
function validate_number(number_id) {
    let is_equal = false
    if (number_id.length === 16) {
        is_equal = true
    }
    return is_equal
}
function validate_exp(exp_id) {
    let date_now = new Date()
    let is_found = true
    let is_equal = true
    let input_year = ''
    let input_month = ''
    for (let index in exp_id) {
        if (exp_id[index] === '-') {
            is_equal = false
        } else if (is_equal) {
            input_year += exp_id[index]
        } else {
            input_month += exp_id[index]
        }
    }
    if (date_now.getFullYear() === Number(input_year)) {
        if (date_now.getMonth() >= Number(input_month)) {
            is_found = false
        }
    } else if (date_now.getFullYear() > Number(input_year)) {
        is_found = false
    }
    return is_found
}

// clear_payment
function clear_payment() {
    document.querySelector('#gmail-check-out').value = ''
    document.querySelector('#location-check-out').value = ''
    document.querySelector('#name-check-out').value = ''
    document.querySelector('#number-check-out').value = ''
    document.querySelector('#year-check-out').value = ''
    document.querySelector('#cvv-check-out').value = ''
    let ratting_us = document.querySelector('.ratting-stars').querySelectorAll('span');
    ratting_us.forEach(span => {
        span.style.color = 'black'; 
    })
}
// ------------------------click----------------------
let dom_cancel_detail = document.querySelector('.cancel').firstElementChild
dom_cancel_detail.addEventListener('click', (e) => {
    hide(dom_dialog)
});
let btn_buy = document.querySelector('#buy-on-detail')
btn_buy.addEventListener('click', (e) => {
    hide(dom_dialog)
    buy_items(index_editor)
});
let dom_credit_card = document.querySelector('#credit-card')
let dom_payment_cacel = document.querySelector('#payment-cacel');
dom_payment_cacel.addEventListener('click', (e) => {
    hide(dom_credit_card)
});

function alert_message(incon, message) {
    Swal.fire({
        position: 'center',
        icon: incon,
        title: message,
        showConfirmButton: false,
        timer: 1500,
    })
}

add_items = load_data('add_items')
numbers_add = load_data('numbers_add')
rating_number = load_data('rating_number')
// save_data(add_items,'add_items')
// save_data(numbers_add,'numbers_add')
rander_product()
