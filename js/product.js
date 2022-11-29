let dom_dialog = document.querySelector('#product-dialog')

let rating_number = []
let products = []
let index_editor = 0

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
        let btn_buy= document.createElement('button');
        btn_buy.id = 'buy'
        btn_buy.textContent = 'Buy';
        btn_card_buy.appendChild(btn_buy);
        // btn_detail.addEventListener('click', delete_product)

        let btn_card_detail = document.createElement('div');
        btn_card_detail.className = 'btn-card-detail';
        let btn_detail = document.createElement('button');
        btn_detail.id = 'detail'
        btn_detail.textContent = 'Detail';
        btn_card_detail.appendChild(btn_detail);
        btn_detail.addEventListener('click',detail_process )

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
    console.log(num_found)
    if (num_found === 0) {
        document.querySelector('.undefind-container').style.display = 'block';
    }else{
        document.querySelector('.undefind-container').style.display = 'none';
    }
}

let search_products = document.querySelector(".search-container").firstElementChild.nextElementSibling;
search_products.addEventListener('keyup', search_process)
console.log(search_products)

let dom_cancel_detail = document.querySelector('.cancel').firstElementChild
dom_cancel_detail.addEventListener('click', (e) => {
    hide(dom_dialog)
});
function detail_process(event){
    show(dom_dialog)
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
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
    for (let item in detail_ratting){
        detail_ratting[item].className= 'fa fa-star'
        if (item < products[index].rating) {
            detail_ratting[item].className= 'fa fa-star checked'
        }
    }
    //change currency
    detail_currency.textContent = 'Currency: '+ products[index].currency
    //change description
    detail_desciption.textContent = 'Desciption: '+ products[index].desciption
    //change price
    detail_price.textContent = 'Price: '+ products[index].price
}
load_data()
rander_product()
