document.addEventListener('DOMContentLoaded', (e) => {
    downLoadAllGames()
    removePromo()
    updateCart()
    const openCartBtn = document.getElementById('openCartBtn')
    openCartBtn.addEventListener('click', () => cartModalBox())
    console.log("DOM fully loaded and parsed")
})

const cart = {}

function showAllGames(games) {
    const gameList = document.getElementById('gameList')
    gameList.innerHTML = ""
    games.forEach(game => showGame(game))
}

function removePromo() {
    const promotionSection = document.getElementById('promotionSection')
    promotionSection.innerHTML = ""
}

function updateCart() {
    const numInCart = document.getElementById('numInCart')
    numInCart.innerText = Object.keys(cart).length
}

function addToCart(game) {
    if(cart[game.id] === undefined) {
        cart[game.id] = [1, game]
    } else {
        console.log(game)
        console.log(cart[game.id])
        ++cart[game.id][0]
    }
    updateCart()
}

function deleteFromCart(game) {
    if(cart[game.id][0] > 1) {
        --cart[game.id][0]
    } else {
        delete cart[game.id]
    }
    updateCart()
    renderCart()
}


// Attach game info to div card
function showGame(game) {
    const gameList = document.getElementById('gameList')
    const product = document.createElement('div')
    product.className = "product"
    gameList.append(product)
    const innerProduct = document.createElement('div')
    innerProduct.className = "inner-product"
    product.append(innerProduct)
    const figureImage = document.createElement('div')
    figureImage.className = "figure-image"
    innerProduct.append(figureImage)
    const figureImganchor = document.createElement('a')
    figureImage.append(figureImganchor)
    figureImganchor.href = "single.html"
    const img = document.createElement('img')
    figureImganchor.append(img)
    img.src = game.thumbnail
    img.alt = "Game 1"
    const productTitle = document.createElement('h3')
    productTitle.className = "product-title"
    innerProduct.append(productTitle)
    const productTitleAnchor = document.createElement('a')
    productTitle.append(productTitleAnchor)
    productTitleAnchor.href = "#"
    productTitleAnchor.innerText = game.title
    const small = document.createElement('small')
    innerProduct.append(small)
    small.className = "price"
    small.innerText = `$${Math.floor(Math.random() * 20)}.00`
    const innerP = document.createElement('p')
    innerProduct.append(innerP)
    innerP.innerText = game.short_description
    const firstAnchor = document.createElement('a')
    innerProduct.append(firstAnchor)
    // firstAnchor.href = "cart.html"
    firstAnchor.className = "button"
    firstAnchor.innerText = "Add to cart"
    const secondAnchor = document.createElement('a')
    innerProduct.append(secondAnchor)
    // secondAnchor.href = "#"
    secondAnchor.className = "button muted"
    secondAnchor.innerText = "Read Details"

    secondAnchor.addEventListener('click', () => showDetailModalBox(game))
    firstAnchor.addEventListener('click', () => addToCart(game))
}

function showDetailModalBox(game) {
// Get the modal
    const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

// Modal Box opened, fill in content
const detailModalImg = document.getElementById('detailModalImg')
const detailModalTitle = document.getElementById('detailModalTitle')
const detailModalDescription = document.getElementById('detailModalDescription')

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/game?id='+game.id)}`)
    .then(response => response.json())
    .then(obj => JSON.parse(obj.contents))
    .then(data => {
       detailModalImg.src =  data.thumbnail
       detailModalTitle.innerText = data.title
       detailModalDescription.innerText = data.description
       // When the user clicks on the button, open the modal
        modal.style.display = "block";
    })

}

function cartModalBox() {
    // Get the modal
        const cartModal = document.getElementById("cartModal");
    
    // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            cartModal.style.display = "none";
        }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
            if (event.target == cartModal) {
                cartModal.style.display = "none";
            }
        }
    
// Modal Box opened, fill in content
    cartModal.style.display = "block";
    renderCart()
}

function renderCart() {
    const cartTable = document.getElementById('cartTable')
    cartTable.innerHTML = ""
    
    Object.keys(cart).forEach(key => showCartItem(cart[key][1], cart[key][0]))
}


function downLoadAllGames() {

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games')}`)
    .then(response => response.json())
    .then(obj => JSON.parse(obj.contents))
    .then(data => {
       showAllGames(data)
    })
}

function searchBar() {
    const myInput = getElementById('myInput')
    searchBar.addEventListener('keyup', e => e.target.value)
}


function showCartItem(item, counter) {
    
    const tr = document.createElement('tr')
    cartTable.append(tr)

    const td = document.createElement('td')
    tr.append(td)
    td.className = "product-name"

    const divProductTn = document.createElement('div')
    td.append(divProductTn)
    divProductTn.className = "product-thumbnail"

    const img = document.createElement('img')
    divProductTn.append(img)
    img.src = item.thumbnail
    img.alt = item.title

    const divproductDt = document.createElement('div')
    td.append(divproductDt)
    divproductDt.className = "product-detail"

    const h3 = document.createElement('h3')
    divproductDt.append(h3)
    h3.className = "product-title"
    h3.innerText = item.title

    const p = document.createElement('p')
    divproductDt.append(p)
    p.innerText = item.short_description

    const tdProductPr = document.createElement('td')
    tr.append(tdProductPr)
    tdProductPr.className = "product-price"
    tdProductPr.innerText = "$15.99"

    const tdProductQty = document.createElement('td')
    tr.append(tdProductQty)
    tdProductPr.className = "product-qty"

    const select = document.createElement('select')
    tdProductQty.append(select)
    select.name = "#"

    const option1 = document.createElement('option')
    select.append(option1)
    option1.value = "1"
    option1.innerText = counter

    const tdProductTl = document.createElement('td')
    tr.append(tdProductTl)
    tdProductTl.className = "product-total"
    tdProductTl.innerText = "$15.99"

    const tdAction = document.createElement('td')
    tr.append(tdAction)
    tdAction.className = "action"
    const tdActionAnchor = document.createElement('a')
    tdAction.append(tdActionAnchor)
    // tdActionAnchor.href = "#"
    const i = document.createElement('i')
    tdActionAnchor.append(i)
    i.className = "fa fa-times"

    tdActionAnchor.addEventListener('click', () => deleteFromCart(item))
}