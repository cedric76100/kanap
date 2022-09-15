// Premiere chose à faire : récupérer la clé cart qui est dans le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
// Récupérer les infos de chaque ligne du panier en appelant le serveur (on lui passe l'id, il nous retourne le canap correspondant)
//console.log(cart);
// Doc : "http://localhost:4000/api/products/:id")
async function getProduct(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:4000/api/products/${id}`)
            .then((response) => response.json())
            .then((canap) => {
                resolve(canap)
            })
            .catch((error) => reject("Erreur : " + error));
    })
}

async function getDetailsFromServer() {
    let html = '';
    let totalPrice = 0;
    let qty = 0

    // On boucle sur chaque article contenu dans le panier
    for (const canap of cart) {
        // On récupère les données à jour contenues sur le serveur
        const product = await getProduct(canap.id);
        // On enrichit le html avec la donnée recu
        html =
            html +
            `<article class="cart__item" data-id="${canap.id}" data-color="${canap.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}"></img>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${canap.color}</p>
                        <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}"></input>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
        totalPrice += canap.quantity * product.price;
        qty += parseInt(canap.quantity);
    }
    // Après on inject la variable avec le texte(html)produit au dessus, dans l'eleemnt avec id "cart__items"
    const cart__items = document.querySelector("#cart__items");
    cart__items.innerHTML = html;
    // Gestion suppression
    const deleteBtns = document.querySelectorAll('.deleteItem');
    for (const deleteBtn of deleteBtns) {
        // On ajoute un écouteur d'evenement sur chaque btn delete
        deleteBtn.addEventListener('click', () => {
            // On récupère le parent
            const selectedArticle = deleteBtn.closest('article');
            // On récupère l'id et la couleur stockées dans data-color et data-id
            const removeId = selectedArticle.getAttribute('data-id');
            const removeColor = selectedArticle.getAttribute('data-color');
            // On boucle sur le cart pour savoir quelle ligne/objet effacer
            // ou on utilise une fonction toute faite qui filtre des données dans un tableau
            cart = cart.filter((toto) => !(toto.id === removeId && toto.color === removeColor));
            // Mise à jour du panier ds le localstorage
            localStorage.setItem("cart", JSON.stringify(cart));
            // Je rappelle la meme fonction pour mettre à jour l'affichage
            getDetailsFromServer();
        })
    }
    // TODO : Mettre à jour la quantité
    function changeQuantity(id, color, qty) {

    }

    document.getElementById("totalQuantity").innerHTML = qty;

    // TODO : Mettre à jour le total
    document.getElementById("totalPrice").innerHTML = totalPrice;
}


getDetailsFromServer();

// TODO verif formulaire

