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
           <li>${element} ${index}</li>
           <button class="delete-btn" onclick="deleteOutputHaveEnough(haveEnoughArr, ${index})">Slett</button>
         </div>
         `;
  });
}

function createOutputAlmostEmpty(arr, output) {
  arr.forEach((element, index) => {
    output.innerHTML += `
          <div class="product-container">
            <li>${element} ${index}</li>
            <button class="delete-btn" onclick="deleteOutputAlmostEmpty(almostEmptyArr, ${index})">Slett</button>
          </div>
          `;
  });
}

function createOutputNeedMore(arr, output) {
  deleteBtn = document.querySelectorAll('.delete-btn');
  arr.forEach((element, index) => {
    output.innerHTML += `
        <li>${needMoreArr[arr.indexOf(element)].product} pris:${needMoreArr[arr.indexOf(element)].price
      }</li>
        <button class="delete-btn" onclick="deleteOutputNeedMore(needMoreArr, ${index})">Slett</button>
      `;
  });
}


function getUserinput() {
  productValue = product.value;
  priceValue = price.value;
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
    });
    clearOutput(needMoreOutput);
    createOutputNeedMore(needMoreArr, needMoreOutput);
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
