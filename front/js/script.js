// appeler le serveur pour recevoir la liste des canapés
function getProducts() {
    fetch("http://localhost:4000/api/products")
        .then((response) => response.json())
        .then((response) => {
            // stocker les produits dans une constante products
            const products = response;
            // console.log(products);
            let html = "";
            // boucler sur les produits pour generer le html attendu
            for (const kanap of products) {
                console.log(kanap);
                html =
                    html +
                    `<a href="./product.html?id=${kanap._id}">
                    <article>
                    <img src="${kanap.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}
                    </article>
                    </a>`;
                //console.log(html);
            }
            // recuperer l'element id items
            const items = document.getElementById("items");
            // console.log(html);
            items.innerHTML = html;
            // injecter le html generé dans l'element items
        })
        .catch((error) => console.log("Erreur : " + error));
}

getProducts();