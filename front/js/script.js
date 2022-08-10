
// appeler le serveur pour recevoir la liste des canapés
function getProducts() {
    fetch("http://localhost:4000/api/products")
        .then((response) => response.json())
        .then((response) => {
            // stocker les produits dans une constante products
            const products = response;
            console.log(products);
            let html = "";
            for (const kanap of products) {
                html =
                    html +
                    `<a href=""><article><img src="${kanap.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">${kanap.name}</h3</article></a>`;
                // console.log(html);
            }
            // boucler sur les produits pour generer le html attendu
            // <a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">Kanap name1</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a> -->
            // recuperer l'element id items
            const items = document.getElementById("items");
            console.log(items);
            items.innerHTML = html;
            // injecter le html generé dans l'element items
        })
        .catch((error) => console.log("Erreur : " + error));
    console.log("toto");
}

getProducts();