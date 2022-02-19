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
const shoppingListTotal = document.querySelector('.total-shopping-list');

const haveEnoughArr = [];
const almostEmptyArr = [];
const needMoreArr = [];
let calculatedPricePerItem = [];

// clear input field when add button triggers
// Add logic to the inputs for numbers and empty field

const toggleClass = (element) => {
  if (selectType.value === 'need-more') {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

const clearOutput = (output) => {
  output.innerHTML = '';
};

const clearInputField = (fieldName) => {
  fieldName.value = '';
};

const uppdateShoppingListTotal = (price) => {
  shoppingListTotal.innerHTML = `
    <li>${price},-</li>
    `;
};

const caclulateTotalAllItems = (arr) => {
  const reducedPrice = arr.reduce((prevVal, curVal) => {
    return prevVal += curVal;
  }, 0);
  console.log(reducedPrice);
  uppdateShoppingListTotal(reducedPrice);
};

function createOutputHaveEnough(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li class="product-list">${element}</li>
        <button class="delete-btn" onclick="deleteOutputHaveEnough(${index})">Slett</button>
      </div>
      `;
  });
}

function deleteOutputHaveEnough(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase() === 'nei') {
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
  } else if (userAnswer.toLowerCase() === 'ja') {
    haveEnoughArr.splice(index, 1);
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
  } else if (userAnswer.toLowerCase() !== 'ja' || userAnswer.toLowerCase() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

function createOutputAlmostEmpty(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li class="product-list">${element}</li>
        <button class="delete-btn" onclick="deleteOutputAlmostEmpty(${index})">Slett</button>
        </div>
        `;
  });
}

function deleteOutputAlmostEmpty(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase() === 'nei') {
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (userAnswer.toLowerCase() === 'ja') {
    almostEmptyArr.splice(index, 1);
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (userAnswer.toLowerCase() !== 'ja' || userAnswer.toLowerCase() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

function createOutputNeedMore(arr, output) {
  deleteBtn = document.querySelectorAll('.delete-btn');
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li class="product-list">${needMoreArr[arr.indexOf(element)].product} Pris:${needMoreArr[arr.indexOf(element)].price} Antall: ${needMoreArr[arr.indexOf(element)].quantity}</li>
        <button class="delete-btn" onclick="deleteOutputNeedMore(${index})">Slett</button>
      </div>
      `;
  });
}

function deleteOutputNeedMore(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase() === 'nei') {
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
  } else if (userAnswer.toLowerCase() === 'ja') {
    needMoreArr.splice(index, 1);
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    calculatetotalPerItem();
    caclulateTotalAllItems(calculatedPricePerItem);
  } else if (userAnswer.toLowerCase() !== 'ja' || userAnswer.toLowerCase() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

if (selectType.value === 'have-enough') {
  createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
} else if (selectType.value === 'almost-empty') {
  createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
} else if (selectType.value === 'need-more') {
  createOutputNeedMore(needMoreArr, needMoreOutput);
}

function calculatetotalPerItem() {
  calculatedPricePerItem = [];
  needMoreArr.forEach((item) => {
    calculatedPricePerItem.push(item.price * item.quantity);
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
    clearInputField(product);
  } else if (selectType.value === 'almost-empty') {
    almostEmptyArr.push(productValue);
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
    clearInputField(product);
  } else if (selectType.value === 'need-more') {
    needMoreArr.push({
      product: productValue,
      price: priceValue,
      quantity: quantityValue,
    });
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    calculatetotalPerItem();
    caclulateTotalAllItems(calculatedPricePerItem);
    clearInputField(product);
    clearInputField(price);
    clearInputField(quantity);
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
    } */
