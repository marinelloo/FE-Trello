import {createTodo} from './createCard.js'

const trash = document.querySelector('.trash');
const btnDeleteAll = document.querySelector('.btn__delete');
const btnDeleteConfirm = document.querySelector('.btn--dark');
const dashboardDone = document.querySelector('.dashboard__cards-done');
const root = document.getElementById('root');
let cardsTodos = document.querySelectorAll(".card__todo");

const TodoConstructor = function (todoTitle, todoDescription, todoImg, todoUser, todoId) {
	this.todoTitle = todoTitle;
	this.todoDescription = todoDescription;
	this.todoImg = todoImg;
	this.todoUser = todoUser;
	this.todoId = todoId;
}

const storage = {
	// Получить все данные из хранилки по ключу
	getDataByKey: function (key) {
	  if (localStorage.getItem(key) !== null) {
		return JSON.parse(localStorage.getItem(key));
	  } else {
		return [];
	  }
	},
	// Добавить данные по ключу
	pushDataByKey: function (key, data) {
	  let dataByKey = this.getDataByKey(key);
	  dataByKey = [...dataByKey, data];
	  localStorage.setItem(key, JSON.stringify(dataByKey));
	},
  };

  
// DragNDrop
let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function(el, target, source, sibling) {
    if (target === containerInProgress && target.children.length >= 6) {
        $('.ui.modal.pop-up__inprogress').modal({blurring: true}).modal('show');

    }
});

// Search
const searchModul = document.querySelector('.search__box');
searchModul.addEventListener('keyup', (event) => {
	const searchModul = document.querySelector(".search__txt");
	const todosArr = document.querySelectorAll('.card__todo');
	let input = searchModul.value;
	input = input.toLowerCase();

	for (const item of todosArr) {
		if (!item.textContent.toLowerCase().includes(input)){
			item.style.display = 'none';
		} else {
			item.style.display = 'block';
		}
	}
})

let todos = JSON.parse(localStorage.getItem("cards")) || [];

//Get access
const approveBtn = document.getElementById("approveBtn");
const cardTodo = document.getElementById("todoCase");
const inputTitle = document.getElementById('inputTitle');
const inputDescription = document.getElementById('inputDescription');

// Open add todo modal
const btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', () => {
	inputTitle.value = '';
	inputDescription.value = '';
	$('.ui.modal.add__todo').modal({ blurring: true }, { allowMultiple: true}).modal('show');
	$('.ui.dropdown').dropdown();
})

approveBtn.addEventListener('click', () => {
	const currentUser = $('#selection').dropdown('get value');
	const el = document.querySelector(`[data-value = ${currentUser}]`);
	const img = el.querySelector('.ui.mini.avatar.image').src;
	const todoUser = el.textContent;
	const todoId = Date.now();

	const todo = new TodoConstructor(inputTitle.value, document.getElementById('inputDescription').value, img, todoUser, todoId);
	cardTodo.append(createTodo(inputTitle.value, document.getElementById('inputDescription').value, img, todoUser, todoId));
	todos.push(todo);
	storage.pushDataByKey('cards', todo);
})

// Edit todo
const btnEditModal = document.querySelectorAll('.card__todo-edit').length;
for(let i = 0; i < btnEditModal; i++) {
    document.querySelectorAll('.card__todo-edit')[i].addEventListener('click', () => {
        $('.ui.modal.add__todo').modal({blurring: true}).modal('show');
        $('.ui.dropdown').dropdown();
    })
}

// Pop ups
const checkTodos = () => {
	const cards = storage.getDataByKey('cards');
	if (cards) {
		todos = [...todos, ...cards.map(card => new TodoConstructor(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId))];
	}
	for(let i = 0; i < todos.length; i++){
		cardTodo.append(createTodo(todos[i].todoTitle, todos[i].todoDescription, todos[i].todoImg, todos[i].todoUser, todos[i].todoId));
	}
}

checkTodos();

root.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'delete-one') {
		const trelloId = document.getElementById('todo-id');
		const currentTrello = event.target.closest('.card__todo');
		if (todos.length) {
			todos = todos.filter(todo => +todo.todoId !== +currentTrello.dataset.trelloId);
			console.log(todos);
			currentTrello.remove();
			localStorage.setItem("cards", JSON.stringify(todos));
			console.log(storage)
		} else {
			localStorage.clear();
			trelloId.remove()
		}
	}
})

// Delete card
btnDeleteConfirm.addEventListener("click", (event) => {
	dashboardDone.innerHTML = '';
});

btnDeleteAll.addEventListener("click", (event) => {
	if (dashboardDone.children.length) {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
	} else {
		// add maybe some message nothing to delete or throw error
		return dashboardDone;
	}

});



// for(let i = 0; i < cardsTodos.length; i++) {
// 	trash[i].addEventListener("click", (event) => {
// 		if(event.target === trash[i]) {
// 			cardsTodos[i].remove();
// 		}
// 	});
// }

