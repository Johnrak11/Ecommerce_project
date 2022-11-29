let rating_number = [3, 4, 1, 2]
let products = [{ 'title': 'jim', 'price': '$65', 'rating': rating_number[0] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[1] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[2] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },
                { 'title': 'jim', 'price': '$65', 'rating': rating_number[3] },]
// let products =[]
function rander_product() {
    // document.querySelector('product-card').remove()
    let card_container = document.querySelector('.product-card-contaier')
    for (let item in products) {
        // create-card--
        let product_card = document.createElement('div')
        product_card.className = 'product-card'

        // ===create-image--
        let product_card_image = document.createElement('div');
        product_card_image.className = 'product-card-image';
        let image = document.createElement('img');
        image.src = '../image/p1.png'
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
        btn_card_container.style.display='none';
        // button --buy--
        let btn_card_buy = document.createElement('div');
        btn_card_buy.className = 'btn-card-buy';
        let btn_buy = document.createElement('button');
        btn_buy.id = 'btn_buy'
        btn_buy.textContent = 'Buy Now';
        btn_card_buy.appendChild(btn_buy);

        let btn_card_detail = document.createElement('div');
        btn_card_detail.className = 'btn-card-detail';
        let btn_detail = document.createElement('button');
        btn_detail.id = 'btn_detail'
        btn_detail.textContent = 'detail';
        btn_card_detail.appendChild(btn_detail);

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
    console.log(card_container)
}

// ===================hover================
function hide(element) {
    element.style.display = 'none'
}
function show(element) {
    element.style.display = 'block'
}
// ====================save file=================
function save_data() {
    localStorage.setItem("products", JSON.stringify(products));
  }
  
function load_data() {
    let productsStorage = JSON.parse(localStorage.getItem("products"));
    if (productsStorage !== null) {
        products = productsStorage;
    }
}
// save_data()
load_data()
rander_product()
