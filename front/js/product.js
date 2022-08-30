// Récupérer l'id qu'on a mis dans l'url
// URLSearchParams avec pour parametre la chaine de caractere ?id=...

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Récuperation des elements pour y avoir acces partout
const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const name = document.getElementById("title");
const title = document.querySelector("title");
const description = document.getElementById("description");
const color = document.getElementById("colors");
const quantity = document.getElementById("quantity");

// Récupérer le bon kanap
// Doc : "http://localhost:4000/api/products/:id")
function getProduct() {
    fetch(`http://localhost:4000/api/products/${id}`)
        .then((response) => response.json())
        .then((response) => {
            const product = response
            // Injecter response.price
            price.textContent = `${product.price}`;
            img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            name.textContent = product.name;
            title.textContent = product.name;
            description.textContent = product.description;
            for (i = 0; i < product.colors.length; i++) {
                color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
            };

            // elementtrouvé.textContent = response.price

        })
        .catch((error) => console.log("Erreur : " + error));
}

getProduct();

document.getElementById("addToCart").addEventListener("click", addToCart);

function addToCart() {
    const colorValue = color.value;
    // parseInt pour transformer la chaine de caratere en nombre entier
    const quantityValue = parseInt(quantity.value);
    // Test pour s'assurer qu'on a au moins une couleur et entre 1 et 100 canaps
    if (colorValue === '') {
        alert('Veuillez sélectionner une couleur');
        return;
    }
    if (quantityValue <= 0 || quantityValue > 100) {
        alert('Veuillez choisir un nombre entre 1 et 100');
        return;
    }
    // Test est ce que le canap + couleur existe deja dans le cart ?

    let cart = JSON.parse(localStorage.getItem("cart"));
    // Si je n'ai pas de panier j'en créé 1 vide pour pouvoir pousser 1 objet sans avoir d'erreur
    if (!cart) {
        cart = []
    }

    // Id+couleur trouvé (meme id + meme couleur) -> mettre à jour la quantité


    // Id+couleur non trouvé, on ajoute une ligne dans le localstorage
    cart.push({ id: id, color: colorValue, quantity: quantityValue });
    localStorage.setItem("cart", JSON.stringify(cart));


    // Alert : votre produit a bien été ajouté au panier

    alert('votre produit a bien été ajouté au panier')
}