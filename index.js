document.addEventListener('DOMContentLoaded', (e) => {
    console.log("DOM fully loaded and parsed")
})





    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games')}`)
    .then(response => response.json())
    .then(obj => JSON.parse(obj.contents))
    .then(data => {
       console.log(data)
    })

