const renameText = document.querySelector('#renameText');
const renameButton = document.querySelector('#renameButton');
const listDesc = document.querySelector('#listDesc');
const ul = document.querySelector('ul');
const addItemText = document.querySelector('#itemText');
const addItemButton = document.querySelector('#addButton');

function addButtonsToItem(li) {
  let up = document.createElement('button');
  up.textContent = 'up';
  up.className = 'upButton';
  li.appendChild(up);

  let down = document.createElement('button');
  down.textContent = 'down';
  down.className = 'downButton';
  li.appendChild(down);

  let remove = document.createElement('button');
  remove.textContent = 'remove';
  remove.className = 'removeButton';
  li.appendChild(remove);
}

renameButton.addEventListener('click', () => {
  listDesc.textContent = renameText.value;
  renameText.value = '';
} );

for (item of ul.children) {
  addButtonsToItem(item);
}

addItemButton.addEventListener('click', () => {
  let newItem = document.createElement('li');
  newItem.textContent = addItemText.value;
  addButtonsToItem(newItem);
  ul.appendChild(newItem);
  addItemText.value = '';
} );

ul.addEventListener('click', function(event) {
  if ( event.target.tagName === "BUTTON" ) {
    let btn = event.target;
    let li = event.target.parentNode;
    // handle UP button
    if ( btn.className === "upButton" ) {
      let prevLi = li.previousElementSibling;
      if ( prevLi ) { // if not first element
        ul.insertBefore(li, prevLi);
      }
    }
    // handle DOWN button
    if ( btn.className === "downButton" ) {
      let nextLi = li.nextElementSibling
      if ( nextLi ) { // if not last element
        ul.insertBefore(nextLi, li); // move next item to before selected
      }
    }
    // handle REMOVE button
    if ( btn.className === "removeButton" ) {
      ul.removeChild(li);
    }
  }
} );
