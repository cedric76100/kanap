// Récupérer l'id qu'on a mis dans l'url
// URLSearchParams avec pour parametre la chaine de caractere ?id=...

const params = new URLSearchParams(window.location.search);
const idofkanap = params.get('id');

// Récupérer le bon kanap
// Doc : "http://localhost:4000/api/products/:id")
function getProduct() {
    fetch(`http://localhost:4000/api/products/${idofkanap}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            // Inclure les element dans le html
            let html = "";

            // Recuperer element price : document.getElementById('price')

            // Injecter response.price

            // elementtrouvé.textContent = response.price
        })
        .catch((error) => console.log("Erreur : " + error));
}

getProduct();