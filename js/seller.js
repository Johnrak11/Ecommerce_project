

let dom_dialog = document.querySelector('#product-dialog')

let rating_number = [0, 0, 0, 0, 0, 0, 0,0]
let products = [{ 'title': 'jim', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us','desciption': 'Black' },
{ 'title': 'jim', 'price': '65', 'rating': 0, 'totail_star':0,'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
{ 'title': 'T-shirt', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
{ 'title': 'gan', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
{ 'title': 'nis', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'euro', 'desciption': 'Black' },
{ 'title': 'get', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
{ 'title': 'no', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
{ 'title': 'no', 'price': '65', 'rating': 0,'totail_star':0, 'photo': 'https://technext.github.io/famms/images/p1.png', 'currency': 'us', 'desciption': 'Black' },
]
let index_editor = 0
let dom_click_add_product = document.querySelector('#click-add');
dom_click_add_product.addEventListener('click', (e) => {
    clear_value()
    add_product()
});
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
        let btn_delete = document.createElement('button');
        btn_delete.id = 'delete'
        btn_delete.textContent = 'Delete';
        btn_card_buy.appendChild(btn_delete);
        btn_delete.addEventListener('click', delete_alert)

        let btn_card_detail = document.createElement('div');
        btn_card_detail.className = 'btn-card-detail';
        let btn_edit = document.createElement('button');
        btn_edit.id = 'edit'
        btn_edit.textContent = 'Edit';
        btn_card_detail.appendChild(btn_edit);
        btn_edit.addEventListener('click', edit_product)

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
function add_product() {
    show(dom_dialog)
    // update text on dialog---
    let header = document.querySelector('#product-dialog').firstElementChild.firstElementChild
    header.textContent = 'Create New Product'
    let create_button = document.querySelector(".create_Btn")
    create_button.textContent = 'Create'
    create_button.id = 'create'
    create_button.addEventListener('click', create_product)
}

function onCancel() {
    hide(dom_dialog)
    clear_value
}
function create_product() {
    let create_button = document.querySelector(".create_Btn")
    if (create_button.id === "create") {
        let new_product = {}
        let num = 0
        new_product['title'] = document.querySelector('#title').value
        new_product['price'] = document.querySelector('#price').value
        new_product['rating'] = num
        new_product['totail_star'] = num
        new_product['photo'] = document.querySelector('#image').value
        let dom_currency =document.querySelectorAll('#currency')
        let checked_value = ''
        dom_currency.forEach(item => {
            if (item.checked){
                checked_value = item.value
            }
        });

        new_product['currency'] = checked_value
        new_product['desciption'] = document.querySelector('#desciption').value
        if (validate_not_input(new_product) && validate_already_input(new_product) && isValidUrl(new_product.photo)) {
            products.push(new_product)
            rating_number.push(num)
            hide(dom_dialog)
            alert_message('success','Create new product')
        } else {
            alert_message('warning','Your input is uncorrect')
        }
        save_data(products,'products')
        save_data(rating_number,'rating_number')
        rander_product()
        console.log(new_product)

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
function clear_value () {
    document.querySelector('#title').value = ''
    document.querySelector('#price').value = ''
    document.querySelector('#desciption').value = ''
    document.querySelector('#image').value = ''
    // tite_value.value = products[index].title
    // price_value.value = products[index].price
    // currency_value.value = products[index].currency
    // desciption_value.value = products[index].desciption
    // image_value.value = products[index].photo
    // edit_button.addEventListener('click', on_edit)
}
//copy from website
function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
}
function validate_not_input(element) {
    return (element['title'] !== '' && element['desciption'] !== '' && element['price'] !== '' && element['currency'] !== '' && element['photo'] !== '')
}
function validate_already_input (element) {
    let is_found = true
    for (let character of products) {
        if (character.title === element.title) {
            is_found = false
        }
    }
    return is_found
}

function delete_product(event) {
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    products.splice(index, 1);
    rating_number.splice(index, 1);
    save_data(products,'products')
    save_data(rating_number,'rating_number')
    rander_product()
}
function delete_alert(e){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          delete_product(e)
        }
      })
}
function edit_product(event) {
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    index_editor = index
    show(dom_dialog)
    // update text on dialog---
    let edit_button = document.querySelector('.create_Btn')
    let header = document.querySelector('#product-dialog').firstElementChild.firstElementChild
    edit_button.textContent = 'Update'
    header.textContent = 'Update Old Product'
    edit_button.id = 'edit'
    // value in input---
    let tite_value = document.querySelector('#title')
    let price_value = document.querySelector('#price')
    let currency_value = document.querySelector('#currency')
    let desciption_value = document.querySelector('#desciption')
    let image_value = document.querySelector('#image')
    tite_value.value = products[index].title
    price_value.value = products[index].price
    currency_value.value = products[index].currency
    desciption_value.value = products[index].desciption
    image_value.value = products[index].photo
    edit_button.addEventListener('click', on_edit)
}
function on_edit() {
    let create_button = document.querySelector(".create_Btn")
    if (create_button.id === "edit") {
        let update_product = {}
        update_product.title = document.querySelector('#title').value
        update_product.price = document.querySelector('#price').value
        // price--
        let dom_currency =document.querySelectorAll('#currency')
        let checked_value = ''
        dom_currency.forEach(item => {
            if (item.checked){
                checked_value = item.value
            }
        });
        update_product.currency = checked_value
        update_product.desciption = document.querySelector('#desciption').value
        update_product.photo = document.querySelector('#image').value
        update_product.rating = 0
        update_product.totail_star = 0
        if (validate_not_input(update_product) && isValidUrl(update_product.photo)) {
            products.splice(index_editor, 1, update_product)
            hide(dom_dialog)
            alert_message('success','Already updated')
        } else {
            alert_message('warning','Your input is uncorrect')
        }
        save_data(products,'products')
        rander_product()
    }
}
save_data(products,'products')
save_data(rating_number,'rating_number')
products = load_data('products')
rating_number = load_data('rating_number')
rander_product()
