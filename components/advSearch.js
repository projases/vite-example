import "./style.css";
//Genera un menu desplegable
function advSearch(iphones) {
  // const menuAdvSearch = document.createElement("div");
  // menuAdvSearch.classList.add("menuAdvSearch");
  //
  const navbar = document.querySelector("#navbar");
  let reference = navbar.children[1];
  navbar.insertBefore(sellerFilter(iphones), reference);
  reference = navbar.children[2];
  navbar.insertBefore(priceFilter(iphones), reference);

  // return menuAdvSearch;
}

// genera un menu select por vendedor
export function sellerFilter(iphones) {
  const sellers = new Set(iphones.map((iphone) => iphone.seller));
  const selectMenu = document.createElement("select");
  selectMenu.classList.add("selectMenu");
  const shop = document.createElement("option");
  shop.textContent = "---seller---";
  selectMenu.appendChild(shop);
  for (const seller of sellers) {
    const shop = document.createElement("option");
    shop.textContent = seller;
    selectMenu.appendChild(shop);
  }
  return selectMenu;
}
// genera un input y un boton para buscador por precio
export function priceFilter() {
  // const prices = iphones.map(iphone => iphone.price)
  const priceFilterContainer = document.createElement("div");
  priceFilterContainer.classList.add("priceSearch");
  const search = document.createElement("input");
  search.setAttribute("type", "text");
  search.setAttribute("placeholder", "Buscar por precio");
  search.classList.add("searchPrice");
  const go = document.createElement("button");
  go.textContent = "Go";
  go.classList.add("goButton");
  priceFilterContainer.appendChild(search);
  priceFilterContainer.appendChild(go);
  return priceFilterContainer;
}
//Genera un botón para borrar búsqueda
export function clearResults() {
  // const clearResultsContainer = document.createElement('div')
  const clearResultsButton = document.createElement("button");
  clearResultsButton.textContent = "Clear";
  // clearResultsContainer.classList.add('clearDiv')
  clearResultsButton.classList.add("clearButton");
  // clearResultsContainer.appendChild(clearResultsButton)
  return clearResultsButton;
}

export default advSearch;
