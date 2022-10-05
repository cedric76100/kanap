const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

const idConfirmation = document.querySelector("#orderId");

//Affichage de l'orderId

idConfirmation.textContent = orderId;
localStorage.setItem("cart", "");