const btn = document.querySelector('.add__task-btn');
const addBtn = document.querySelector('.add__item-btn');
const cancelBtn = document.querySelector('.cancel__item-btn');
const textarea = document.querySelector('.textarea');
const form = document.querySelector('.form');
const boardBtn = document.querySelector('.board-btn');
const boards = document.querySelector('.boards');
const deleteBtn = document.querySelector('.delete__btn');

let value;
let LS = localStorage.getItem('boards');
console.log(LS);

const addTask = () => {
  form.style.display = 'block';
  btn.style.display = 'none';
  addBtn.style.display = 'none';
  textarea.addEventListener('input', (e) => {
    value = e.target.value;
    if (value.trim() !== '') {
      addBtn.style.display = 'block';
    } else {
      addBtn.style.display = 'none';
    }
  });
};
const cancelTask = () => {
  textarea.value = '';
  value = '';
  form.style.display = 'none';
  btn.style.display = 'flex';
};
const addTaskToList = () => {
  const newItem = document.createElement('div');
  const lists = document.querySelectorAll('.list');
  newItem.classList.add('list__item');
  newItem.draggable = true;
  newItem.innerHTML = `${value} <span class="delete__btn"> &#10006;</span>`;
  lists[0].append(newItem);
  newItem.querySelector('.delete__btn').addEventListener('click', () => {
    newItem.remove();
  });
  dragNdrop();
  cancelTask();
};
const changeTitle = () => {
  const titles = document.querySelectorAll('.title');

  titles.forEach((title) => {
    title.addEventListener('click', (e) => (e.target.textContent = ''));
  });
};
const addBoard = () => {
  const board = document.createElement('div');
  board.classList.add('boards__item');
  board.innerHTML = `<span class="delete__board-btn"> &#10006;</span><span contenteditable="true" class="title">ENTER BOARD TITLE</span>
 <div class="list"></div>`;
  boards.append(board);
  changeTitle();
  dragNdrop();
};

btn.addEventListener('click', addTask);
cancelBtn.addEventListener('click', cancelTask);
addBtn.addEventListener('click', addTaskToList);
boardBtn.addEventListener('click', addBoard);
changeTitle();

document.addEventListener('keyup', (event) => {
  if (event.code === 'Enter' && value.trim() !== '') addTaskToList();
});

let draggedItem;

const dragNdrop = () => {
  const lists = document.querySelectorAll('.list');
  const listItems = document.querySelectorAll('.list__item');
  const boards = document.querySelectorAll('.boards__item');
  for (let index = 0; index < listItems.length; index++) {
    const item = listItems[index];
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });
    item.addEventListener('dragend', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });

    item.addEventListener('click', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
    item.querySelector('.delete__btn').addEventListener('click', () => {
      item.remove();
    });
    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      });
      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      });
      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        this.append(draggedItem);
      });
    }
  }

  for (let index = 0; index < boards.length; index++) {
    const itemBoard = boards[index];
    if (index !== 0) {
      itemBoard
        .querySelector('.delete__board-btn')
        .addEventListener('click', () => {
          itemBoard.remove();
        });
    }
  }
};

dragNdrop();
