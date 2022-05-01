const body = document.querySelector("body");

body.addEventListener("click", addProduct);
body.addEventListener("click", subProduct);
body.addEventListener("click", deleteProduct);
body.addEventListener("click", deleteAll);
body.addEventListener("click", likeHeart);

//Turns heart icon to red
function likeHeart(e) {
  if (e.target.className == "fa fa-heart") {
    e.target.classList.add("red-text");
  } else if (e.target.className == "fa fa-heart red-text") {
    e.target.className = "fa fa-heart";
  }
}

let totalArr = [];
let sumTotal = 0;
//Increments products by 1 and calculates total price
function addProduct(e) {
  if (e.target.parentElement.classList.contains("add-one")) {
    const ulChild = e.target.parentElement.parentElement;
    const liParent = ulChild.parentNode;
    const liIndex = Array.prototype.indexOf.call(liParent.children, ulChild);

    let prodQuant = parseInt(
      e.target.parentElement.previousElementSibling.innerHTML
    );

    let prodPrice = parseInt(
      document.querySelector("#unit-price").nextElementSibling.children[liIndex]
        .textContent
    );
    prodQuant++;
    e.target.parentElement.previousElementSibling.innerHTML = prodQuant;

    document.querySelector("#total-price").nextElementSibling.children[
      liIndex
    ].textContent = prodPrice * prodQuant;

    totalArr.unshift(prodPrice);
    sumTotal = totalArr.reduce((partialSum, a) => partialSum + a, 0);

    document.querySelector("#total-slot").textContent = sumTotal;
  }

}

//Decrements products by 1 and calculates total price
function subProduct(e) {
  if (e.target.parentElement.classList.contains("sub-one")) {
    const ulChild = e.target.parentElement.parentElement;
    const liParent = ulChild.parentNode;
    const liIndex = Array.prototype.indexOf.call(liParent.children, ulChild);

    let prodQuant = parseInt(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .innerHTML
    );
    let prodPrice = parseInt(
      document.querySelector("#unit-price").nextElementSibling.children[liIndex]
        .textContent
    );

    if (prodQuant == 0) {
      prodQuant = 0;
      prodPrice = 0;
    } else {
      prodQuant = prodQuant - 1;
      e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML =
        prodQuant;
      document.querySelector("#total-price").nextElementSibling.children[
        liIndex
      ].textContent = prodPrice * prodQuant;
    }

    totalArr.unshift(-prodPrice);

    sumTotal = totalArr.reduce((partialSum, a) => partialSum + a, 0);

    document.querySelector("#total-slot").textContent = sumTotal;


  }
}

//Deletes a product
function deleteProduct(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    //Get index of li in ul
    const ulChild = e.target.parentElement.parentElement;
    const liParent = ulChild.parentNode;
    const liIndex = Array.prototype.indexOf.call(liParent.children, ulChild);


    //Recalculate total price
    const subTotal = parseInt(document.querySelector('#total-price').nextElementSibling.children[liIndex].textContent)

    totalArr.unshift(-subTotal)

    sumTotal = totalArr.reduce((partialSum, a) => partialSum + a, 0);

    document.querySelector("#total-slot").textContent = sumTotal;

    //Remove li from all other lists
    document
      .querySelector("#quantities")
      .nextElementSibling.children[liIndex].remove();
    document
      .querySelector("#unit-price")
      .nextElementSibling.children[liIndex].remove();
    document
      .querySelector("#total-price")
      .nextElementSibling.children[liIndex].remove();

    

    //Remove li from Shopping cart list
    e.target.parentElement.parentElement.remove();

    

  }
}

//Deletes all products
function deleteAll(e) {
  if (e.target.classList.contains("clear-tasks") && e.target.previousElementSibling.className == 'collection') {
    e.target.previousElementSibling.innerHTML = '';
    document.querySelector("#quantities").nextElementSibling.innerHTML = '';
    document.querySelector("#unit-price").nextElementSibling.innerHTML = '';
    document.querySelector("#total-price").nextElementSibling.innerHTML = '';
  }
}
