let dom_dialog = document.querySelector('#product-dialog')

let rating_number = [3, 4, 1, 2]
let products = [{ 'title': 'jim', 'price': '$65', 'rating': rating_number[0], 'photo': 'https://technext.github.io/famms/images/p1.png', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
{ 'title': 'jim', 'price': '$65', 'rating': rating_number[1], 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': '$', 'desciption': 'Black' },
]

function rander_product() {
    ///remove product-card-contaier
    document.querySelector('.product-card-contaier').remove();
    //create product to display on screen
    let parent_card_container = document.querySelector('.product-container')
    let card_container = document.createElement('div')
    card_container.className ='product-card-contaier'
    for (let item in products) {
        // create-card--
        let product_card = document.createElement('div')
        product_card.className = 'product-card'
        product_card.dataset.index =item;

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
        let btn_delete = document.createElement('button');
        btn_delete.id = 'delete'
        btn_delete.textContent = 'Delete';
        btn_card_buy.appendChild(btn_delete);
        btn_delete.addEventListener('click', delete_product)

        let btn_card_detail = document.createElement('div');
        btn_card_detail.className = 'btn-card-detail';
        let btn_edit = document.createElement('button');
        btn_edit.id = 'edit'
        btn_edit.textContent = 'Edit';
        btn_card_detail.appendChild(btn_edit);

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

// ===================hover================
function hide(element) {
    element.style.display = 'none'
}
function show(element) {
    element.style.display = 'block'
}
//   -----------------save file------------

function save_data() {
    localStorage.setItem("products", JSON.stringify(products));
}
//   -----------------save file------------
function load_data() {
    let productsStorage = JSON.parse(localStorage.getItem("products"));
    if (productsStorage !== null) {
        products = productsStorage;
    }
}
function add_product() {
    console.log('add')
    show(dom_dialog)
    let editButton = document.querySelector(".create_Btn")
    editButton.textContent = 'Create'
    editButton.id = 'create'
    if (editButton.id === "create") {
        editButton.addEventListener('click', create_product)
    }
}

function onCancel() {
    hide(dom_dialog)
}
function create_product() {
    let new_product = {}
    let num = 0
    new_product['title'] = document.querySelector('#title').value
    new_product['price'] = document.querySelector('#price').value
    new_product['rating'] = num
    new_product['photo'] = document.querySelector('#image').value
    new_product['currency'] = document.querySelector('#currency').value
    new_product['desciption'] = document.querySelector('#desciption').value
    if (new_product['title'] !== '' && new_product['desciption'] !== '' && new_product['price'] !== '' && new_product['currency'] !== '' && new_product['photo'] !== '') {
        products.push(new_product)
        rating_number.push(num)
        hide(dom_dialog)
    } else {
        window.alert('Pleace fill the text')
    }
    save_data()
    rander_product()
}
function delete_product(event) {
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    products.splice(index, 1);
    save_data()
    rander_product()
}
save_data()
load_data()
rander_product()
