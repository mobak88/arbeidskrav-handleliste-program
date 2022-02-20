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
    setTimeout(() => {
      element.classList.remove('visuallyhidden');
    }, 10);
  } else {
    element.classList.add('visuallyhidden');
    element.addEventListener('transitionend', (e) => {
      element.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
  }
};

const toggleShoppingList = (arr, shoppingList) => {
  if (arr.length === 0) {
    shoppingList.classList.add('visuallyhidden');
    shoppingList.addEventListener('transitionend', (e) => {
      shoppingList.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });

  } else {
    shoppingList.classList.remove('hidden');
    setTimeout(() => {
      shoppingList.classList.remove('visuallyhidden');
    }, 10);
  }
};

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
    clearOutput(haveEnoughOutput);
    createOutputHaveEnough(haveEnoughArr, haveEnoughOutput);
    toggleShoppingList(haveEnoughArr, haveEnoughContainer);
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
    toggleShoppingList(almostEmptyArr, almostEmptyContainer);
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
    toggleShoppingList(needMoreArr, needMoreContainer);
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
    if (productValue === '' || !isNaN(productValue)) {
      product.classList.add('error-border-input');
      displayErrMsg(errMsgProduct);
      errMsgProduct.classList.remove('visuallyhidden');
    } else {
      product.classList.remove('error-border-input');
      hideErrMsg(errMsgProduct);
      haveEnoughArr.push(productValue);
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
      displayErrMsg(errMsgQuantity);
    } else {
      quantity.classList.remove('error-border-input');
      hideErrMsg(errMsgQuantity);
    }

    if (!isNaN(priceValue) && !isNaN(quantityValue) && priceValue !== '' && quantityValue !== '' && productValue !== '' && isNaN(productValue)) {
      needMoreArr.push({
        product: productValue,
        price: priceValue,
        quantity: quantityValue,
      });
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

// Valgte å bruke foreach loops fordi at man looper gjennom alle elementer
// i dette prosjektet og har derfor kommentert ut for loop siden det var i kravet
// for (let i = 0; i < arr.length; i++) {
//       output.innerHTML += `
//         <li>${haveEnoughArr[i]}</li>
//         <button onclick='addOnclickToDeleteBtn(${i})'>Slett</button>
//         `;
//     }
