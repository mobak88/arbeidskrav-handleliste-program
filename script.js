const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const selectType = document.getElementById('select-type');
const product = document.getElementById('product');
const haveEnoughContainer = document.getElementById('have-enough-container');
const almostEmptyContainer = document.getElementById('almost-empty-container');
const needMoreContainer = document.getElementById('need-more-container');

const btn = document.querySelector('.btn');
const haveEnoughOutput = document.querySelector('.have-enough-output');
const almostEmptyOutput = document.querySelector('.almost-empty-output');
const needMoreOutput = document.querySelector('.need-more-output');
const needMoreInputsContainer = document.querySelector('.need-more-inputs-container');
const shoppingListTotal = document.querySelector('.total-shopping-list');
const errMsgProduct = document.querySelector('.error-msg-product');
const errMsgPrice = document.querySelector('.error-msg-price');
const errMsgQuantity = document.querySelector('.error-msg-quantity');

const haveEnoughArr = JSON.parse(localStorage.getItem('productHaveEnough')) || [];
const almostEmptyArr = JSON.parse(localStorage.getItem('productAlmostEmpty')) || [];
const needMoreArr = JSON.parse(localStorage.getItem('productNeedMore')) || [];
let calculatedPricePerItem = [];

/* Cudos to Rune Lillesveen for providing a great solution for animations with display none: https://codepen.io/lilles/pen/NWwMPJz */
let hidden = true;
const toggleInputs = (element) => {
  if (selectType.value === 'need-more' && hidden === true) {
    hidden = false;
    element.classList.remove('hidden');
    element.clientWidth;
    requestAnimationFrame(() => {
      element.classList.remove('size-hidden');
      element.classList.add('size-shown');
    });
  } else if (selectType.value === 'almost-empty' && hidden === false) {
    hidden = true;
    element.addEventListener("transitionend", () => {
      element.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
    requestAnimationFrame(() => {
      element.classList.remove('size-shown');
      element.classList.add('size-hidden');
    });
  } else if (selectType.value === 'have-enough' && hidden === false) {
    hidden = true;
    element.addEventListener("transitionend", () => {
      element.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
    requestAnimationFrame(() => {
      element.classList.remove('size-shown');
      element.classList.add('size-hidden');
    });
  }
};

selectType.addEventListener('change', () => {
  toggleInputs(needMoreInputsContainer);
});

const displayErrMsg = (errMsg) => {
  errMsg.classList.remove('hidden');
  errMsg.classList.remove('visuallyhidden');
};

const hideErrMsg = (errMsg) => {
  errMsg.classList.add('hidden');
  errMsg.classList.add('visuallyhidden');
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

const localPrice = JSON.parse(localStorage.getItem('productNeedMore'));

if (localPrice !== null) {
  const newReducePrice = [];
  for (let i = 0; i < localPrice.length; i++) {
    newReducePrice.push(localPrice[i].price * localPrice[i].quantity);
  }
  calculatedPricePerItem = [...newReducePrice];
}

const caclulateTotalAllItems = (arr) => {
  const reducedPrice = arr.reduce((prevVal, curVal) => {
    return prevVal += curVal;
  }, 0);
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
    localStorage.setItem('productHaveEnough', JSON.stringify(haveEnoughArr));
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
    toggleShoppingList(haveEnoughArr, haveEnoughContainer);
  } else if (userAnswer.toLowerCase() !== 'ja' || userAnswer.toLowerCase() !== 'nei') {
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
  const userAnswer = prompt(`Vil du slette ${almostEmptyArr[index]}?`);
  if (userAnswer.toLowerCase().trim() === 'nei') {
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
  } else if (userAnswer.toLowerCase().trim() === 'ja') {
    almostEmptyArr.splice(index, 1);
    localStorage.setItem('productAlmostEmpty', JSON.stringify(almostEmptyArr));
    clearOutput(almostEmptyOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
    toggleShoppingList(almostEmptyArr, almostEmptyContainer);
  } else if (userAnswer.toLowerCase() !== 'ja' || userAnswer.toLowerCase() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

function createOutputNeedMore(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
      <div class="product-container-need-more">
        <li class="product-list-need-more product-name-spacing">${needMoreArr[arr.indexOf(element)].product.charAt(0).toUpperCase() + needMoreArr[arr.indexOf(element)].product.slice(1)}</li>
        <li class="product-list-need-more quantity-spacing">${needMoreArr[arr.indexOf(element)].quantity}</li>
        <li class="product-list-need-more price-spacing">${needMoreArr[arr.indexOf(element)].price},-</li>
        <li><button class="delete-btn" onclick="deleteOutputNeedMore(${index})">Slett</button></li>
      </div>
      `;
  });
}

function deleteOutputNeedMore(index) {
  const userAnswer = prompt(`Vil du slette ${needMoreArr[index].product}?`);
  if (userAnswer.toLowerCase().trim() === 'nei') {
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
  } else if (userAnswer.toLowerCase().trim() === 'ja') {
    needMoreArr.splice(index, 1);
    localStorage.setItem('productNeedMore', JSON.stringify(needMoreArr));
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    toggleShoppingList(needMoreArr, needMoreContainer);
    calculatetotalPerItem();
    caclulateTotalAllItems(calculatedPricePerItem);
  } else if (userAnswer.toLowerCase().trim() !== 'ja' || userAnswer.toLowerCase().trim() !== 'nei') {
    alert('Du må svare ja eller nei');
  }
}

const toggleShoppingList = (arr, shoppingList) => {
  if (arr.length === 0) {
    shoppingList.classList.add('hidden');
    shoppingList.classList.add('visuallyhidden');
  } else {
    clearOutput(haveEnoughOutput);
    clearOutput(needMoreOutput);
    clearOutput(almostEmptyOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
    createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
    caclulateTotalAllItems(calculatedPricePerItem);
    shoppingList.classList.remove('hidden');
    requestAnimationFrame(() => {
      shoppingList.classList.remove('visuallyhidden');
    });
  }
};

toggleShoppingList(haveEnoughArr, haveEnoughContainer);
toggleShoppingList(needMoreArr, needMoreContainer);
toggleShoppingList(almostEmptyArr, almostEmptyContainer);

if (selectType.value === 'have-enough') {
  toggleShoppingList(haveEnoughArr, haveEnoughContainer);
} else if (selectType.value === 'almost-empty') {
  toggleShoppingList(haveEnoughArr, haveEnoughContainer);
} else if (selectType.value === 'need-more') {
  toggleShoppingList(haveEnoughArr, haveEnoughContainer);
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
    if (productValue === '' || !isNaN(productValue)) {
      product.classList.add('error-border-input');
      displayErrMsg(errMsgProduct);
      errMsgProduct.classList.remove('visuallyhidden');
    } else {
      product.classList.remove('error-border-input');
      hideErrMsg(errMsgProduct);
      haveEnoughArr.push(productValue);
      localStorage.setItem('productHaveEnough', JSON.stringify(haveEnoughArr));
      clearOutput(haveEnoughOutput);
      createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
      toggleShoppingList(haveEnoughArr, haveEnoughContainer);
      clearInputField(product);
    }
  } else if (selectType.value === 'almost-empty') {
    if (productValue === '' || !isNaN(productValue)) {
      product.classList.add('error-border-input');
      displayErrMsg(errMsgProduct);
    } else {
      product.classList.remove('error-border-input');
      hideErrMsg(errMsgProduct);
      almostEmptyArr.push(productValue);
      localStorage.setItem('productAlmostEmpty', JSON.stringify(almostEmptyArr));
      clearOutput(almostEmptyOutput);
      createOutputAlmostEmpty(almostEmptyArr, almostEmptyOutput);
      toggleShoppingList(almostEmptyArr, almostEmptyContainer);
      clearInputField(product);
    }
  } else if (selectType.value === 'need-more') {
    if (productValue === '' || !isNaN(productValue)) {
      product.classList.add('error-border-input');
      displayErrMsg(errMsgProduct);
    } else {
      product.classList.remove('error-border-input');
      hideErrMsg(errMsgProduct);
    }

    if (priceValue === '' || isNaN(priceValue)) {
      price.classList.add('error-border-input');
      displayErrMsg(errMsgPrice);
    } else {
      price.classList.remove('error-border-input');
      hideErrMsg(errMsgPrice);
    }

    if (quantityValue === '' || isNaN(quantityValue)) {
      quantity.classList.add('error-border-input');
      needMoreInputsContainer.classList.add('need-more-margin');
      displayErrMsg(errMsgQuantity);
    } else {
      quantity.classList.remove('error-border-input');
      needMoreInputsContainer.classList.remove('need-more-margin');
      hideErrMsg(errMsgQuantity);
    }

    if (!isNaN(priceValue) && !isNaN(quantityValue) && priceValue !== '' && quantityValue !== '' && productValue !== '' && isNaN(productValue)) {
      needMoreArr.push({
        product: productValue,
        price: priceValue,
        quantity: quantityValue,
      });
      localStorage.setItem('productNeedMore', JSON.stringify(needMoreArr));
      clearOutput(needMoreOutput);
      createOutputNeedMore(needMoreArr, needMoreOutput);
      toggleShoppingList(needMoreArr, needMoreContainer);
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
