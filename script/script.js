const encrypt = document.querySelector('.encrypt');
const decrypt = document.querySelector('.decrypt');
let textArea = document.querySelector('#text-area');
let keyValue = document.querySelector('.key-area');
let consoleArea = document.querySelector('.console');
let lengthFlag = false;

let keyArray = [];
let decryptionArray = [];

// Setting case to upper case, deleting all spaces.
textArea.addEventListener('input', function (event) {
  event.target.value = event.target.value.toUpperCase().replace(/ /g, '');
});

keyValue.addEventListener('input', function (event) {
  event.target.value = event.target.value.toUpperCase().replace(/ /g, '');
});

// Encrypt button
encrypt.addEventListener('click', function () {
  if (textArea.value.length == 0 || keyValue.value.length == 0) {
    consoleArea.innerHTML += "Either your text's or key's length is 0. \
    Fix it, then try again.<br>"
    return;
  }
  
  if (textArea.value.length !== keyValue.value.length) {
    consoleArea.innerHTML += "<b>Sadly: </b>" + 
    "your text's length is " + textArea.value.length + ", \
    simultaneously, the length of your key is " + keyValue.value.length + ". \
    The lengths must be the same. Try again.<br>";
    return;
  } else {
    lengthFlag = true;
  }

  let encryption = doEncrypt(textArea.value, keyValue.value);

  consoleArea.innerHTML += `<b>Entered string is:</b> ${textArea.value}<br>`;
  consoleArea.innerHTML += `<b>Entered key is:</b> ${keyValue.value}<br>`;
  consoleArea.innerHTML += `<b>Encryption result is:</b> ${insertSpaces(encryption)}.<br>`;
});

// Decrypt button
decrypt.addEventListener('click', function () {
  if (textArea.value.length == 0 || keyValue.value.length == 0) {
    consoleArea.innerHTML += "Either your text's or key's length is 0. \
    Fix it, then try again.<br>"
    return;
  }

  let incomingBinaryCode = insertSpaces(textArea.value).split(' ');

  let result = '';
  let decryption = '';
  let showDecrypt = document.createElement('p');
  keyArray = insertSpaces((turnBinary(keyValue.value))).split(' ');
  
  // Handling an error when key is too short
  try {
    // Processing incoming binary code
    for (let i = 0; i < incomingBinaryCode.length; i++) {
      for (let j = 0; j < incomingBinaryCode[i].length; j++) {
        // console.log(`i: ${i}, j: ${j}`)
        if (incomingBinaryCode[i][j] === '0' && keyArray[i][j] === '0') {
          decryption += '0';
        } else if ((incomingBinaryCode[i][j] === '1' && keyArray[i][j] === '0') || (incomingBinaryCode[i][j] === '0' && keyArray[i][j] === '1')) {
          decryption += '1';
        } else if (incomingBinaryCode[i][j] === '1' && keyArray[i][j] === '1') {
          decryption += '0';
        }
      }
    }
  } catch (error) {
    consoleArea.innerHTML += "Your binary code or key is incorrect. Fix, then try again.<br>";
    return;
  }

  decryptionArray = insertSpaces(decryption).split(' ');
  
  // Checking incoming binary code being only digits
  function isAllDigits(input) {
    return /^\d+$/.test(input);
  }

  textAreaAllDigitsFlag = isAllDigits(textArea.value)

  if (textAreaAllDigitsFlag) {
    consoleArea.innerHTML += `<b>Entered key for decryption:</b> ${keyValue.value}.`
    consoleArea.innerHTML += `<br><b>Binary code after being processed is:</b> ${decryptionArray.join(' ')}.<br>`;
    for (i in decryptionArray) {
      consoleArea.innerHTML += `${decryptionArray[i]} = ${deleteBinary(decryptionArray[i])}. `;
    }

    for (let i = 0; i < decryptionArray.length; i++) {
      result += deleteBinary(decryptionArray[i]);
    }

    showDecrypt.innerHTML = `<b>Decryption result is:</b> ${result}.`;
    consoleArea.append(showDecrypt);
  } else {
    consoleArea.innerHTML += 'Your binary code is broken. Make sure there is only digits.<br>'
  }
});

function turnBinary(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(2);
  }
  return result;
};

// Encrypting the string, using the key
function doEncrypt(str, key) {
  let result = '';
  for (let i = 0; i < turnBinary(str).length; i++) {
    if (turnBinary(str)[i] === '0' && turnBinary(key)[i] === '0') {
      result += '0';
    } else if ((turnBinary(str)[i] === '1' && turnBinary(key)[i] === '0') || (turnBinary(str)[i] === '0' && turnBinary(key)[i] === '1')) {
      result += '1';
    } else if (turnBinary(str)[i] === '1' && turnBinary(key)[i] === '1') {
      result += '0';
    }
  }
  return result;
};

/* Inserting spaces in one entire code. Therefore, making possible 
   insert this data in the array spliting by spaces */ 
function insertSpaces(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str[i];

    if (i === str.length - 1) {
      break;
    }

    if ((i + 1) % 7 === 0) {
      result += ' ';
    }
  }

  return result;
};

// Turning from a binary to a string
function deleteBinary(str) {
  let result = parseInt(str, 2);
  return String.fromCharCode(result);
};

// Clear all
const btnClearAll = document.getElementById('btn-clear-all');

btnClearAll.addEventListener('click', () => {
  textArea.value = '';
  keyValue.value = '';
  consoleArea.innerHTML = '';
});