const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

const idConfirmation = document.querySelector("#orderId");

//Affichage de l'orderId
(function () {
    idConfirmation.innerHTML =
        `${orderId} `;

    localStorage.clear();
})();