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

    // Recupérer les boutons qtity
    const quantityBtns = document.querySelectorAll('.itemQuantity');
    for (const quantityBtn of quantityBtns) {
        // On écoute le changement de valeur sur toutes les qtités
        quantityBtn.addEventListener('change', async () => {
            // On récupère le parent
            const selectedArticle = quantityBtn.closest('article');
            // On récupère l'id et la couleur stockées dans data-color et data-id
            const updatedId = selectedArticle.getAttribute('data-id');
            const updatedColor = selectedArticle.getAttribute('data-color');
            // On boucle sur le cart pour savoir quelle ligne/objet éditer
            for (const canap of cart) {
                if (canap.id === updatedId && canap.color === updatedColor) {
                    canap.quantity = parseInt(quantityBtn.value);
                    // On arrete la boucle quand on a trouvé et mis à jour le bon canap : break
                    break;
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            // Je rappelle la meme fonction pour mettre à jour l'affichage
            getDetailsFromServer();
        })
    }
    // Mettre à jour la quantité globale
    document.getElementById("totalQuantity").textContent = qty;
    // Mettre à jour le prix total
    document.getElementById("totalPrice").textContent = totalPrice;
}

getDetailsFromServer();

// formulaire

// sélection du bouton Valider
const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
    event.preventDefault();

    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    };


    // contrôle des champs Prénom, Nom et Ville
    const regExPrenomNomVille = (value) => {
        return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
    };

    // contrôle du champ Adresse
    const regExAdresse = (value) => {
        return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
    };

    // contrôle du champ Email
    const regExEmail = (value) => {
        return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
            value
        );
    };

    // Fonctions de contrôle du champ Prénom:
    function firstNameControl() {
        const prenom = contact.firstName;
        if (regExPrenomNomVille(prenom)) {
            document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#firstNameErrorMsg").textContent =
                "Champ Prénom de formulaire invalide, ex: Jules";
            return false;
        }
    }

    // Fonctions de contrôle du champ Nom:
    function lastNameControl() {
        const nom = contact.lastName;
        if (regExPrenomNomVille(nom)) {
            document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#lastNameErrorMsg").textContent =
                "Champ Nom de formulaire invalide, ex: Durant";
            return false;
        }
    }

    // Fonctions de contrôle du champ Adresse:
    function addressControl() {
        const adresse = contact.address;
        if (regExAdresse(adresse)) {
            document.querySelector("#addressErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#addressErrorMsg").textContent =
                "Champ Adresse de formulaire invalide, ex: 20 rue de la gare";
            return false;
        }
    }

    // Fonctions de contrôle du champ Ville:
    function cityControl() {
        const ville = contact.city;
        if (regExPrenomNomVille(ville)) {
            document.querySelector("#cityErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#cityErrorMsg").textContent =
                "Champ Ville de formulaire invalide, ex: Paris";
            return false;
        }
    }

    // Fonctions de contrôle du champ Email:
    function mailControl() {
        const courriel = contact.email;
        if (regExEmail(courriel)) {
            document.querySelector("#emailErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#emailErrorMsg").textContent =
                "Champ Email de formulaire invalide, ex: exemple@contact.fr";
            return false;
        }
    }

    // Contrôle du formulaire avant de l'envoyer dans le local storage
    if (
        firstNameControl() &&
        lastNameControl() &&
        addressControl() &&
        cityControl() &&
        mailControl()
    ) {
        // Enregistrer le formulaire dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
    }
});
