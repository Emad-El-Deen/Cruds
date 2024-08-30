let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCountItem = document.getElementById("productCountItem");
let ProductTaxes = document.getElementById("ProductTaxes");
let productTotal = document.getElementById("productTotal");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let searchInput = document.getElementById("searchInput");
let addProduct = document.getElementById("addProduct");
let updateProduct = document.getElementById("updateProduct");
let hideTable = document.getElementById("hideTable");
let table = document.getElementById("table");
let showTable = document.getElementById("showTable");

// start total
function getTotal() {
  if (productPrice.value != "") {
    let result =
      +productPrice.value * +productCountItem.value + +ProductTaxes.value;
    productTotal.innerHTML = result;
    productTotal.style.backgroundColor = "#080";
  } else {
    productTotal.innerHTML = "0";
    productTotal.style.background = "#2a8a85";
  }
}
productPrice.addEventListener("keyup", getTotal);
productCountItem.addEventListener("keyup", getTotal);
ProductTaxes.addEventListener("keyup", getTotal);
// End total

// my container
let productsContainer = [];
if (localStorage.getItem("pro") !== null) {
  productsContainer = JSON.parse(localStorage.getItem("pro"));
  displayData();
}

// Start add Product
addProduct.onclick = function () {
  if (checkInputs() == true) {
    let products = {
      name: productName.value,
      price: productPrice.value,
      taxes: ProductTaxes.value,
      countItem: productCountItem.value,
      total: productTotal.innerHTML,
      Category: productCategory.value,
      desc: productDesc.value,
    };
    productsContainer.push(products);
    localStorage.setItem("pro", JSON.stringify(productsContainer));
    displayData();
    clearData();
    checkTrue.classList.remove("d-none");
    checkFalse.classList.add("d-none");
  } else {
    addProduct.disabled = true;
    checkFalse.classList.remove("d-none");
    checkTrue.classList.add("d-none");
  }
};
// End add Product

// Start Clear Data
function clearData() {
  productName.value = null;
  productPrice.value = null;
  productCountItem.value = null;
  ProductTaxes.value = null;
  productTotal.value = null;
  productCategory.value = null;
  productDesc.value = null;
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCountItem.classList.remove("is-valid");
  ProductTaxes.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
  productName.classList.remove("is-invalid");
  productPrice.classList.remove("is-invalid");
  productCountItem.classList.remove("is-invalid");
  ProductTaxes.classList.remove("is-invalid");
  productCategory.classList.remove("is-invalid");
  productDesc.classList.remove("is-invalid");
}
// End Clear Data

// Start Display Data
function displayData() {
  getTotal();
  let table = ``;
  for (let i = 0; i < productsContainer.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].countItem}</td>
    <td>${productsContainer[i].taxes}</td>
    <td>${productsContainer[i].total}</td>
    <td>${productsContainer[i].Category}</td>
    <td>${productsContainer[i].desc}</td>
    <td><button onclick="updateFormData(${i})" class=" fas fa-edit text-green"></i></button></td>
    <td><button onclick="deleteData(${i})" class="fa-solid fa-x text-danger"> </button></td>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}
// End Display Data

// Start Delete Data
function deleteData(index) {
  productsContainer.splice(index, 1);
  displayData();
  localStorage.setItem("pro", JSON.stringify(productsContainer));
}
// End Delete Data

// Start Search by name & Category
function searchData() {
  let index = searchInput.value;
  let table = ``;
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(index.toLowerCase()) ==
        true ||
      productsContainer[i].Category.toLowerCase().includes(
        index.toLowerCase()
      ) == true
    ) {
      table += `
  <tr>
  <td>${i + 1}</td>
  <td>${productsContainer[i].name}</td>
  <td>${productsContainer[i].price}</td>
  <td>${productsContainer[i].countItem}</td>
  <td>${productsContainer[i].taxes}</td>
  <td>${productsContainer[i].total}</td>
  <td>${productsContainer[i].Category}</td>
  <td>${productsContainer[i].desc}</td>
    <td><button onclick="updateFormData(${i})" class=" fas fa-edit text-green"></i></button></td>
    <td><button onclick="deleteData(${i})" class="fa-solid fa-x text-danger"> </button></td>
  </tr>
  `;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
searchInput.addEventListener("input", searchData);

// End Search by name & Category

// Start Update Data
let updateIndex;
function updateFormData(index) {
  updateIndex = index;
  addProduct.classList.add("d-none");
  updateProduct.classList.remove("d-none");
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCountItem.value = productsContainer[index].countItem;
  ProductTaxes.value = productsContainer[index].taxes;
  getTotal();
  productCategory.value = productsContainer[index].Category;
  productDesc.value = productsContainer[index].desc;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

updateProduct.onclick = function () {
  addProduct.classList.remove("d-none");
  updateProduct.classList.add("d-none");
  productsContainer[updateIndex].name = productName.value;
  productsContainer[updateIndex].price = productPrice.value;
  productsContainer[updateIndex].countItem = productCountItem.value;
  productsContainer[updateIndex].taxes = ProductTaxes.value;
  productsContainer[updateIndex].Category = productCategory.value;
  productsContainer[updateIndex].desc = productDesc.value;
  productsContainer[updateIndex].total = productTotal.innerHTML;
  localStorage.setItem("pro", JSON.stringify(productsContainer));
  displayData();
  clearData();
};
// End Update Data

// start validation method

// start name method
function valName() {
  let regexName = /^[A-Z][a-z]{2,10}$/;
  if (regexName.test(productName.value) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    productName.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productName.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
productName.addEventListener("input", valName);
// End name method

// start price method
function valPrice() {
  let regexPrice = /^[0-9]{1,6}$/;
  if (regexPrice.test(productPrice.value) == true) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    productPrice.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    productPrice.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
productPrice.addEventListener("input", valPrice);
// start price method

// start Count Item method
function valCountItem() {
  let regexCountItem = /^[0-9]{1,5}/;
  if (regexCountItem.test(productCountItem.value) == true) {
    productCountItem.classList.add("is-valid");
    productCountItem.classList.remove("is-invalid");
    productCountItem.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    productCountItem.classList.add("is-invalid");
    productCountItem.classList.remove("is-valid");
    productCountItem.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
productCountItem.addEventListener("input", valCountItem);
// End Count Item method

// start Taxes method
function valTaxes() {
  let regexTaxes = /^[0-9]{1,5}/;
  if (regexTaxes.test(ProductTaxes.value) == true) {
    ProductTaxes.classList.add("is-valid");
    ProductTaxes.classList.remove("is-invalid");
    ProductTaxes.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    ProductTaxes.classList.add("is-invalid");
    ProductTaxes.classList.remove("is-valid");
    ProductTaxes.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
ProductTaxes.addEventListener("input", valTaxes);
// End Taxes method

// start Desc method
function valDesc() {
  let regexDesc = /^.{0,10}$/;
  if (regexDesc.test(productDesc.value) == true) {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    productDesc.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    productDesc.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
productDesc.addEventListener("input", valDesc);
// End Desc method

// start Category method
function valCategory() {
  let regexCategory = /^(Mobile|TV|Screeens|Electronics|Laptop)$/;
  if (regexCategory.test(productCategory.value) == true) {
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    productCategory.nextElementSibling.classList.replace("d-block", "d-none");
    addProduct.disabled = false;
    return true;
  } else {
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    productCategory.nextElementSibling.classList.replace("d-none", "d-block");
    addProduct.disabled = true;
    return false;
  }
}
productCategory.addEventListener("input", valCategory);
// End Category method

// End validation method

// start check Inputs
function checkInputs(params) {
  if (
    valName() == true &&
    valPrice() == true &&
    valCategory() == true &&
    valCountItem() == true &&
    valTaxes() == true &&
    valDesc() == true
  ) {
    return true;
  } else {
    return false;
  }
}
// End check Inputs

// Start show and hide table

hideTable.onclick = function () {
  table.classList.add("d-none");
  showTable.classList.remove("d-none");
  hideTable.classList.add("d-none");
};
showTable.onclick = function () {
  table.classList.remove("d-none");
  showTable.classList.add("d-none");
  hideTable.classList.remove("d-none");
  scroll({
    top: 500,
    behavior: "smooth",
  });
};
// End show and hide table

