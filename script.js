const price = document.getElementById('price');
const selectType = document.getElementById('select-type');
const btn = document.querySelector('.btn');
const haveEnoughOutput = document.querySelector('.have-enough-output');
const almostEmptyOutput = document.querySelector('.almost-empty-output');
const needMoreOutput = document.querySelector('.need-more-output');
const product = document.getElementById('product');

const haveEnoughArr = [];
const almostEmptyArr = [];
const needMoreArr = [];

// alert('Velkommen');
function enablePrice() {
  if (selectType.value === 'need-more') {
    price.disabled = false;
  } else {
    price.disabled = true;
  }
}

function clearOutput(output) {
  output.innerHTML = '';
}

function createOutput(arr, output) {
  /*  if ((arr = needMoreArr)) {
    arr.forEach((element) => {
      output.innerHTML += `<li>${arr[0].price} pris:${arr[0].product}</li>`;
      console.log(element);
    });
  } else { */
  arr.forEach((element) => {
    output.innerHTML += `<li>${element}</li>`;
  });
  // }
}

function getUserinput() {
  productValue = product.value;
  priceValue = price.value;
  if (selectType.value === 'have-enough') {
    haveEnoughArr.push(productValue);
    clearOutput(haveEnoughOutput);
    createOutput(haveEnoughArr, haveEnoughOutput);
    console.log(haveEnoughArr);
  } else if (selectType.value === 'almost-empty') {
    almostEmptyArr.push(productValue);
    clearOutput(almostEmptyOutput);
    createOutput(almostEmptyArr, almostEmptyOutput);
    console.log(almostEmptyArr);
  } else if (selectType.value === 'need-more') {
    needMoreArr.push({
      product: productValue,
      price: priceValue,
    });
    clearOutput(needMoreOutput);
    createOutput(needMoreArr, needMoreOutput);
    console.log(needMoreArr);
    console.log(needMoreArr[0].price);
    console.log(needMoreArr[0].product);
  }
}

function addProduct(e) {
  e.preventDefault();
  getUserinput();
}
