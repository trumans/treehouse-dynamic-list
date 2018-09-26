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

// Toogle the colors on the  Up button on first item and Down button on last item
//   if 'default' then enable CSS default.
//   if 'gray' then set color and background to gray
function toggleUpDownButtonColors(ul, state) {
  let setting;
  if ( state === 'default' ) {
    setting = '';
  } else {
    setting = 'lightgray';
  }
  let first = ul.firstElementChild.querySelector('.upButton');
  first.style.color = setting;
  first.style.backgroundColor = setting;
  let last = ul.lastElementChild.querySelector('.downButton');
  last.style.color = setting;
  last.style.backgroundColor = setting;
}

renameButton.addEventListener('click', () => {
  listDesc.textContent = renameText.value;
  renameText.value = '';
} );

for (item of ul.children) {
  addButtonsToItem(item);
}
toggleUpDownButtonColors(ul, 'gray');

addItemButton.addEventListener('click', () => {
  let newItem = document.createElement('li');
  newItem.textContent = addItemText.value;
  addButtonsToItem(newItem);
  toggleUpDownButtonColors(ul, 'default');  // remove gray fronm buttons
  ul.appendChild(newItem);
  toggleUpDownButtonColors(ul, 'gray');  // add gray to new item
  addItemText.value = '';
} );

ul.addEventListener('click', function(event) {
  if ( event.target.tagName === "BUTTON" ) {
    // remove gray from buttoms on first and last items
    toggleUpDownButtonColors(ul, 'default');

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

    // reset buttons on new first & last items
    toggleUpDownButtonColors(ul, 'gray');
  }
} );
