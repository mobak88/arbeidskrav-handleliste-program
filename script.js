const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const selectType = document.getElementById('select-type');
const product = document.getElementById('product');

const btn = document.querySelector('.btn');
const haveEnoughOutput = document.querySelector('.have-enough-output');
const almostEmptyOutput = document.querySelector('.almost-empty-output');
const needMoreOutput = document.querySelector('.need-more-output');
const priceContainer = document.querySelector('.price-container');
const quantityContainer = document.querySelector('.quantity-container');

const haveEnoughArr = [];
const almostEmptyArr = [];
const needMoreArr = [];
let calculatedPricePerItem = [];

// alert('Velkommen');

function toggleClass(element) {
  if (selectType.value === 'need-more') {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

function clearOutput(output) {
  output.innerHTML = '';
}

function deleteOutputHaveEnough(index) {
  haveEnoughArr.splice(index, 1);
  clearOutput(haveEnoughOutput);
  createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
}

function deleteOutputAlmostEmpty(index) {
  almostEmptyArr.splice(index, 1);
  clearOutput(almostEmptyOutput);
  createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
}

function deleteOutputNeedMore(index) {
  needMoreArr.splice(index, 1);
  clearOutput(needMoreOutput);
  createOutputNeedMore(needMoreArr, needMoreOutput);
}

if (selectType.value === 'have-enough') {
  createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
} else if (selectType.value === 'almost-empty') {
  createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
} else if (selectType.value === 'need-more') {
  createOutputNeedMore(needMoreArr, needMoreOutput);
}


function createOutputHaveEnough(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li>Produkt nummer ${index + 1}: ${element}</li>
        <button class="delete-btn" onclick="deleteOutputHaveEnough(haveEnoughArr, ${index})">Slett</button>
      </div>
      `;
  });
}

function createOutputAlmostEmpty(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li>Produkt nummer ${index + 1}:${element} </li>
        <button class="delete-btn" onclick="deleteOutputAlmostEmpty(almostEmptyArr, ${index})">Slett</button>
        </div>
        `;
  });
}

function calculatetotalPerItem() {
  calculatedPricePerItem = [];
  needMoreArr.forEach((item) => {
    totalPricePerItem = item.price * item.quantity;
    calculatedPricePerItem.push(totalPricePerItem);
    console.log(calculatedPricePerItem);
  });
}

function createOutputNeedMore(arr, output) {
  deleteBtn = document.querySelectorAll('.delete-btn');
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li>Produkt nummer ${index + 1}: ${needMoreArr[arr.indexOf(element)].product} Pris:${needMoreArr[arr.indexOf(element)].price} Antall: ${needMoreArr[arr.indexOf(element)].quantity}</li>
        <button class="delete-btn" onclick="deleteOutputNeedMore(needMoreArr, ${index})">Slett</button>
      </div>
      `;
  });
}

function getUserinput() {
  productValue = product.value;
  priceValue = price.value;
  quantityValue = quantity.value;
  if (selectType.value === 'have-enough') {
    haveEnoughArr.push(productValue);
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
  } else if (selectType.value === 'almost-empty') {
    almostEmptyArr.push(productValue);
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (selectType.value === 'need-more') {
    needMoreArr.push({
      product: productValue,
      price: priceValue,
      quantity: quantityValue,
    });
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    calculatetotalPerItem();
    console.log(needMoreArr);
  }
}

function addProduct(e) {
  e.preventDefault();
  getUserinput();
}

/* for (let i = 0; i < arr.length; i++) {
      output.innerHTML += `
        <li>${haveEnoughArr[i]}</li>
        <button onclick='addOnclickToDeleteBtn(${i})'>Slett</button>
        `;
      console.log(haveEnoughArr);
      console.log(i);
    } */
