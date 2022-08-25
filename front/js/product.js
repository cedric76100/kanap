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
            //console.log(response);
            const product = response
            //console.log(product)
            // Inclure les element dans le html

            // Recuperer element price : document.getElementById('price')
            let price = document.getElementById("price");
            let img = document.querySelector(".item__img");
            let name = document.getElementById("title");
            let title = document.querySelector("title");
            let description = document.getElementById("description");
            let color = document.getElementById("colors");
            //console.log(price)
            // Injecter response.price
            price.innerHTML = `${product.price}`;
            img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            name.innerHTML = product.name;
            title.innerHTML = product.name;
            description.innerHTML = product.description;
            for (i = 0; i < product.colors.length; i++) {
                color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
            };

            // elementtrouvé.textContent = response.price

        })
        .catch((error) => console.log("Erreur : " + error));
}

getProduct();