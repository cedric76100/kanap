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

let canapList = [];

async function getDetailsFromServer() {
    for (const canap of cart) {
        const result = await getProduct(canap.id);
        //console.log(result);
        // To do : pousser le resultat dans canapList
        canapList = result
        //console.log(canapList);

    }
    let html = ""
    // Ici on a récupé toutes les infos qu'on a stocké dans canapList
    // On boucle sur canapList pour afficher les infos sur notre page panier
    // On appelle ça du templating
    // stocker ces infos dans une variable
    html =
        html +
        `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé"></img>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></input>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
    // Après on inject la variable avec le texte(html)produit au dessus, dans l'eleemnt avec id "cart__items"
    const cart__items = document.querySelector("cart__items");
    cart__items.innerHTML = html;
    // Boom
}








getDetailsFromServer();
