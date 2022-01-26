document.addEventListener('DOMContentLoaded', (e) => {
    downLoadAllGames()
    console.log("DOM fully loaded and parsed")
})

function showAllGames(games) {
    const gameList = document.getElementById('gameList')
    gameList.innerHTML = ""
    games.forEach(game => showGame(game))
}

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
    small.innerText = "$19.00"
    const innerP = document.createElement('p')
    innerProduct.append(innerP)
    innerP.innerText = game.short_description
    const firstAnchor = document.createElement('a')
    innerProduct.append(firstAnchor)
    firstAnchor.href = "cart.html"
    firstAnchor.className = "button"
    firstAnchor.innerText = "Add to cart"
    const secondAnchor = document.createElement('a')
    innerProduct.append(secondAnchor)
    // secondAnchor.href = "#"
    secondAnchor.className = "button muted"
    secondAnchor.innerText = "Read Details"

    secondAnchor.addEventListener('click', () => showDetailModalBox(game))
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


function downLoadAllGames() {

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games')}`)
    .then(response => response.json())
    .then(obj => JSON.parse(obj.contents))
    .then(data => {
       showAllGames(data)
    })
}