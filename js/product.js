let dom_product_card = document.querySelector('.product-card')
let dom_btn_card_container = document.querySelector('.btn-card-container')

dom_product_card.addEventListener('mouseover', (e) => {
    show(dom_btn_card_container)
    console.log('helllo')
});
dom_product_card.addEventListener('mouseout', (e) => {
    hide(dom_btn_card_container)
    console.log('helllo')
});

function hide(element) {
    element.style.display = 'none'
}
function show(element) {
    element.style.display = 'block'
}