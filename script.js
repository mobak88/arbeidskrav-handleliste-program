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

function deleteOutput(index) {
  haveEnoughArr.splice(index, 1);
  addOnclickToDeleteBtn();
}

function createOutput(arr, output) {
  if (selectType.value === 'need-more') {
    arr.forEach((element) => {
      output.innerHTML += `
        <li>${needMoreArr[arr.indexOf(element)].product} pris:${needMoreArr[arr.indexOf(element)].price
        }</li>
        <button class="delete-btn">Slett</button>
      `;
    });
  } else {
    arr.forEach((element, index) => {
      deleteBtn = document.querySelectorAll('.delete-btn');
      output.innerHTML += `
        <div class="product-container">
          <li>${element} ${index}</li>
          <button class="delete-btn" onclick="deleteOutput(${index})">Slett</button>
        </div>
        `;
    });
  }
}

function addOnclickToDeleteBtn() {
  if (selectType.value === 'have-enough') {
    clearOutput(haveEnoughOutput);
    createOutput(haveEnoughArr, haveEnoughOutput);
  } else if (selectType.value === 'almost-empty') {
    deleteOutput(almostEmptyArr);
    clearOutput(almostEmptyOutput);
    createOutput(almostEmptyArr, almostEmptyOutput);
  } else if (selectType.value === 'need-more') {
    deleteOutput(needMoreArr);
    clearOutput(needMoreOutput);
    createOutput(needMoreArr, needMoreOutput);
  }
};

function getUserinput() {
  productValue = product.value;
  priceValue = price.value;
  if (selectType.value === 'have-enough') {
    haveEnoughArr.push(productValue);
    clearOutput(haveEnoughOutput);
    createOutput(haveEnoughArr, haveEnoughOutput);
  } else if (selectType.value === 'almost-empty') {
    almostEmptyArr.push(productValue);
    clearOutput(almostEmptyOutput);
    createOutput(almostEmptyArr, almostEmptyOutput);
  } else if (selectType.value === 'need-more') {
    needMoreArr.push({
      product: productValue,
      price: priceValue,
    });
    clearOutput(needMoreOutput);
    createOutput(needMoreArr, needMoreOutput);
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
