document.addEventListener('DOMContentLoaded', (e) => {
    downLoadAllGames()
    console.log("DOM fully loaded and parsed")
})


	// 	<a href="cart.html" class="button">Add to cart</a>
	//  <a href="#" class="button muted">Read Details</a>



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
    secondAnchor.href = "#"
    secondAnchor.className = "button muted"
    secondAnchor.innerText = "Read Details"
}

function downLoadAllGames() {

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games')}`)
    .then(response => response.json())
    .then(obj => JSON.parse(obj.contents))
    .then(data => {
       showAllGames(data)
    })
}
