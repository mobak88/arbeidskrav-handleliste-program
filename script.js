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
const errMsgProduct = document.querySelector('.error-msg-product');
const errMsgPrice = document.querySelector('.error-msg-price');
const errMsgQuantity = document.querySelector('.error-msg-quantity');

const haveEnoughArr = [];
const almostEmptyArr = [];
const needMoreArr = [];
let calculatedPricePerItem = [];

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
        <li class="product-list">${element.charAt(0).toUpperCase() + element.slice(1)}</li>
        <button class="delete-btn" onclick="deleteOutputHaveEnough(${index})">Slett</button>
      </div>
      `;
  });
}

function deleteOutputHaveEnough(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase().trim() === 'nei') {
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
  } else if (userAnswer.toLowerCase().trim() === 'ja') {
    haveEnoughArr.splice(index, 1);
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
  } else if (userAnswer.toLowerCase().trim() !== 'ja' || userAnswer.toLowerCase().trim() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

function createOutputAlmostEmpty(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li class="product-list">${element.charAt(0).toUpperCase() + element.slice(1)}</li>
        <button class="delete-btn" onclick="deleteOutputAlmostEmpty(${index})">Slett</button>
        </div>
        `;
  });
}

function deleteOutputAlmostEmpty(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase().trim() === 'nei') {
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (userAnswer.toLowerCase().trim() === 'ja') {
    almostEmptyArr.splice(index, 1);
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (userAnswer.toLowerCase().trim() !== 'ja' || userAnswer.toLowerCase().trim() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

function createOutputNeedMore(arr, output) {
  deleteBtn = document.querySelectorAll('.delete-btn');
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container">
        <li class="product-list">${needMoreArr[arr.indexOf(element)].quantity} ${needMoreArr[arr.indexOf(element)].product.charAt(0).toUpperCase() + needMoreArr[arr.indexOf(element)].product.slice(1)} Pris: ${needMoreArr[arr.indexOf(element)].price},- </li>
        <button class="delete-btn" onclick="deleteOutputNeedMore(${index})">Slett</button>
      </div>
      `;
  });
}

function deleteOutputNeedMore(index) {
  const userAnswer = prompt(`Vil du slette ${haveEnoughArr[index]}?`);
  if (userAnswer.toLowerCase().trim() === 'nei') {
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
  } else if (userAnswer.toLowerCase().trim() === 'ja') {
    needMoreArr.splice(index, 1);
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    calculatetotalPerItem();
    caclulateTotalAllItems(calculatedPricePerItem);
  } else if (userAnswer.toLowerCase().trim() !== 'ja' || userAnswer.toLowerCase().trim() !== 'nei') {
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
  productValue = product.value.trim();
  priceValue = price.value.trim();
  quantityValue = quantity.value.trim();
  if (selectType.value === 'have-enough') {
    if (productValue === '') {
      product.classList.add('error-border-input');
      errMsgProduct.classList.remove('error-msg-hidden');
    } else {
      product.classList.remove('error-border-input');
      errMsgProduct.classList.add('error-msg-hidden');
      haveEnoughArr.push(productValue);
      clearOutput(haveEnoughOutput);
      createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
      clearInputField(product);
    }
  } else if (selectType.value === 'almost-empty') {
    if (productValue === '') {
      product.classList.add('error-border-input');
      errMsgProduct.classList.remove('error-msg-hidden');
    } else {
      product.classList.remove('error-border-input');
      errMsgProduct.classList.add('error-msg-hidden');
      almostEmptyArr.push(productValue);
      clearOutput(almostEmptyOutput);
      createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
      clearInputField(product);
    }
  } else if (selectType.value === 'need-more') {
    if (productValue === '') {
      product.classList.add('error-border-input');
      errMsgProduct.classList.remove('error-msg-hidden');
    } else {
      product.classList.remove('error-border-input');
      errMsgProduct.classList.add('error-msg-hidden');
    }

    if (priceValue === '' || isNaN(priceValue)) {
      price.classList.add('error-border-input');
      errMsgPrice.classList.remove('error-msg-hidden');
    } else {
      price.classList.remove('error-border-input');
      errMsgPrice.classList.add('error-msg-hidden');
    }

    if (quantityValue === '' || isNaN(quantityValue)) {
      quantity.classList.add('error-border-input');
      errMsgQuantity.classList.remove('error-msg-hidden');
    } else {
      quantity.classList.remove('error-border-input');
      errMsgQuantity.classList.add('error-msg-hidden');
    }

    if (productValue !== '' && priceValue !== '' && typeof priceValue === 'number' && quantityValue !== '' && typeof quantityValue === 'number') {
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
