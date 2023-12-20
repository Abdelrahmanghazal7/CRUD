var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProduct");
var updateProductBtn = document.getElementById("updateProduct");
var productList;
var productListName = "productList";
var indexItemForUpdate;

if (localStorage.getItem(productListName) == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem(productListName));
  displayProduct(productList);
}

function addProduct() {

  if (validate() == true) {

    var product = {
      name: productName.value,
      price: productPrice.value,
      model: productModel.value,
      desc: productDesc.value
    }

    productList.push(product);

    displayProduct(productList);

    flagProduct();

    localStorage.setItem(productListName, JSON.stringify(productList))
  }
}

function displayProduct(product) {

  var cartona = ``;

  for (let i = 0; i < product.length; i++) {

    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${product[i].newName ? product[i].newName : product[i].name}</td>
        <td>${product[i].price}</td>
        <td>${product[i].model}</td>
        <td class="desc">${product[i].desc}</td>
        <td>
            <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>
    `
  }

  document.getElementById("tBoody").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1)

  localStorage.setItem(productListName, JSON.stringify(productList))

  displayProduct(productList)
}

function searchByName(term) {
  var foundedItems = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
      foundedItems.push(productList[i]);
    }
  }
  displayProduct(foundedItems);
}

function updateProduct(item) {

  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");

  indexItemForUpdate = item;

  flagProduct(productList[item]);
}

function flagProduct(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDesc.value = flag ? flag.desc : "";
}

function updateNewProduct() {

  addProductBtn.classList.remove("d-none");
  updateProductBtn.classList.replace("d-block", "d-none");

  productList[indexItemForUpdate].name = productName.value;
  productList[indexItemForUpdate].price = productPrice.value;
  productList[indexItemForUpdate].model = productModel.value;
  productList[indexItemForUpdate].desc = productDesc.value;

  localStorage.setItem(productListName, JSON.stringify(productList));

  flagProduct();

  displayProduct(productList);
}

function validateProductName() {

  var regexProductName = /^[A-Z][a-z]{3,8}$/;

  if (regexProductName.test(productName.value) == true) {
    document.getElementById("wrongName").classList.add("d-none")
    productName.style.border = "none"
    return true;
  } else {
    document.getElementById("wrongName").classList.remove("d-none")
    productName.style.border = "5px solid red"
    return false;
  }
}

function validateProductPrice() {

  var regexProductPrice = /^[1-9][0-9]{3}|1[0]{4}$/;

  if (regexProductPrice.test(productPrice.value) == true) {
    document.getElementById("wrongPrice").classList.add("d-none")
    productPrice.style.border = "none"
    return true;
  } else {
    document.getElementById("wrongPrice").classList.remove("d-none")
    productPrice.style.border = "5px solid red"
    return false;
  }
}

function validateProductModel() {

  var regexProductModel = /tv|mobile|laptop/;

  if (regexProductModel.test(productModel.value) == true) {
    document.getElementById("wrongModel").classList.add("d-none")
    productModel.style.border = "none"
    return true;
  } else {
    document.getElementById("wrongModel").classList.remove("d-none")
    productModel.style.border = "5px solid red"
    return false;
  }
}

function validateProductDesc() {

  var regexProductDesc = /.{250,}/;

  if (regexProductDesc.test(productDesc.value) == true) {
    document.getElementById("wrongDescription").classList.add("d-none")
    productDesc.style.border = "none"
    return true;
  } else {
    document.getElementById("wrongDescription").classList.remove("d-none")
    productDesc.style.border = "5px solid red"
    return false;
  }

}

function validate() {
  if (validateProductName() == true && validateProductPrice() == true && validateProductModel() == true && validateProductDesc() == true) {
    return true;
  } else {
    return false;
  }
}