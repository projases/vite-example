import "./style.css";
// const MAX_OPEN_CARDS = 2
import products from "./iphones";
import advSearch, {
  sellerFilter,
  priceFilter,
  clearResults,
} from "./components/advSearch.js";
// Crear una variable contenedora de iphones
const iphoneContainer = document.querySelector("#iPhones");
//crear menu desplegable
const searchComponent = advSearch(products);
// append el menú al header
document.querySelector(".header").append(searchComponent);
//que no se vea el menú
searchComponent.style.display = "none";
const clearPopUp = clearResults();
document.body.appendChild(clearPopUp);
clearPopUp.style.display = "none";

// Crear tarjeta de iphone
function createPhoneCard(iphone) {
  //crear tarjeta
  const card = document.createElement("div");
  card.classList.add("card");

  //Crear un div con la información del iphone
  const back = document.createElement("div");
  back.classList.add("back");
  const iphoneInfo = document.createElement("p");

  iphoneInfo.textContent = `
    Name: ${iphone.name}
    Price: ${iphone.price}
    Stars: ${iphone.stars}
    Reviews: ${iphone.reviews}
    Seller: ${iphone.seller}
`;
  // Información de iphone en cara reversa
  back.appendChild(iphoneInfo);
  // Crear cara frontal con la foto
  const front = document.createElement("div");
  front.classList.add("front");
  front.style.backgroundImage = `url(${iphone.image})`;

  //poner las caras de las tarjeta como hijos de la tarjeta
  card.appendChild(back);
  card.appendChild(front);

  return card;
}
//flip the card
function flipCard(card) {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
}
// buscador por precio
function priceSearch(products, refPrice) {
  const searchResults = products.filter((iphone) => {
    console.log(iphone.price);
    return parseFloat(iphone.price) <= refPrice;
  });
  return searchResults;
}
//buscador por vendedor
function sellerSearch(products, refSeller) {
  const searchResults = products.filter((iphone) => {
    return iphone.seller === refSeller;
  });
  return searchResults;
}
// borrar busqueda y parámetros de busqueda avanzada
function clearAll() {
  document.querySelector(".searchPrice").value = "";
  document.querySelector(".selectMenu").selectedIndex = 0;
  renderSearchResults(products);
}

// generar cartas iphone y asignarles el flip
products.forEach((iphone) => {
  const card = createPhoneCard(iphone);
  flipCard(card);
  iphoneContainer.append(card);
});

// renderizadora de iphones
function renderSearchResults(searchResults) {
  // borrar busqueda anterior
  iphoneContainer.innerHTML = "";
  // renderizar resultados searchResults
  searchResults.forEach((iphone) => {
    const card = createPhoneCard(iphone);
    flipCard(card);
    iphoneContainer.append(card);
  });
}

// ------------------Event listeners-------------------------------
document.querySelector(".search").addEventListener("input", () => {
  const query = document.querySelector(".search").value.toLowerCase();
  const searchResults = products.filter((iphone) => {
    let iphoneProperties = Object.values(iphone);
    for (let i = 0; i < iphoneProperties.length - 1; i++) {
      console.log(iphoneProperties[i]);
      if (iphoneProperties[i].toString().toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  });
  renderSearchResults(searchResults);
});

// Toggle menu de busqueda avanzada
document.querySelector(".advSearch").addEventListener("mouseover", () => {
  searchComponent.style.display = "flex";
  iphoneContainer.classList.add("blurred");
});
searchComponent.addEventListener("mouseleave", () => {
  searchComponent.style.display = "none";
  iphoneContainer.classList.remove("blurred");
});

// botón de búsqueda por precio
document.querySelector(".goButton").addEventListener("click", () => {
  let refPrice = parseFloat(document.querySelector(".searchPrice").value);
  const searchResults = priceSearch(products, refPrice);
  renderSearchResults(searchResults);
  clearPopUp.style.display = "block";
});
// selección de menú select
document.querySelector(".selectMenu").addEventListener("change", () => {
  let refSeller = document.querySelector(".selectMenu").value;
  const searchResults = sellerSearch(products, refSeller);
  renderSearchResults(searchResults);
  clearPopUp.style.display = "block";
});

// botón de borrar busqueda actual
clearPopUp.addEventListener("click", () => {
  clearAll();
  clearPopUp.style.display = "none";
});
