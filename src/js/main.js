import {swiperMode} from './responsive.js'
import {createTodo} from './createCard.js'

// on load
window.addEventListener('load', function() {
	swiperMode();
});

/* On Resize*/
window.addEventListener('resize', function() {
	swiperMode();
});


// DragNDrop

let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');
const root = document.getElementById('root');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function(el, target, source, sibling) {
   if (target === containerInProgress && target.children.length >= 6) {
      $('.ui.modal.pop-up__inprogress').modal({blurring: true}).modal('show');
   }
});


// Search

const searchModul = document.querySelectorAll('.search__box');

searchModul.forEach(it => {
	it.addEventListener('keyup', (event) => {
		const searchModul = event.target;
		const todosArr = document.querySelectorAll('.card__todo');
		let input = searchModul.value;
		input = input.toLowerCase();

		for (const item of todosArr) {
			if (!item.textContent.toLowerCase().includes(input)){
				item.style.display = 'none';
			} else {
				item.style.display = 'block';
			};
		};
	});
});


//Add New card

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

let todos =  [];

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

// Edit todo

const btnEditModal = document.querySelectorAll('.card__todo-edit').length;
for(let i = 0; i < btnEditModal; i++) {
	document.querySelectorAll('.card__todo-edit')[i].addEventListener('click', () => {
		$('.ui.modal.add__todo').modal({blurring: true}).modal('show');
		$('.ui.dropdown').dropdown();
	})
}


const checkTodos = () => {
	const cards = storage.getDataByKey('cards');
	if (cards) {
		todos = [...todos, ...cards.map(card => new TodoConstructor(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId))];
	}
	for(let i = 0; i < todos.length; i++){
		cardTodo.append(createTodo(todos[i].todoTitle, todos[i].todoDescription, todos[i].todoImg, todos[i].todoUser, todos[i].todoId));
	}
}



approveBtn.addEventListener('click', () => {
	const currentUser = $('#selection').dropdown('get value');
	const el = document.querySelector(`[data-value = ${currentUser}]`);
	const img = el.querySelector('.ui.mini.avatar.image').src;
	const todoUser = el.textContent;
	const todoId = Date.now();

	console.log(currentUser)

	const todo = new TodoConstructor(inputTitle.value, document.getElementById('inputDescription').value, img, todoUser, todoId);
	cardTodo.append(createTodo(inputTitle.value, document.getElementById('inputDescription').value, img, todoUser, todoId));
	todos.push(todo);
	storage.pushDataByKey('cards', todo);
})


// Pop ups


let btnDeleteAll = document.querySelector('.btn__delete');
let btnDeleteConfirm = document.querySelector('.btn--dark');
let dashboardDone = document.querySelector('.dashboard__cards-done');

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
		
	} else if (event.target.dataset.type === 'edit-one') {
		//const btnEditLength = document.querySelectorAll('.card__todo-edit');
		//console.log(btnEditLength);
		const trelloId = document.getElementById('todo-id');
		const currentTrello = event.target.closest('.card__todo');
		
		$('.ui.modal.add__todo').modal({ blurring: true }, { allowMultiple: true }).modal('show');
		$('.ui.dropdown').dropdown();
		inputTitle.value = document.querySelector('.card__todo-title').innerHTML;
		inputDescription.value = document.querySelector('.todo-description').innerHTML;
	}
})

btnDeleteConfirm.addEventListener("click", (event) => {
	if (dashboardDone.children.length) {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
	} else {
		// add maybe some message nothing to delete or throw error
		return dashboardDone;
	}
});

btnDeleteAll.addEventListener("click", (event) => {
	$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
});


// CREATE CARD

const createTodo = (todoTitle, todoDescription, todoImg, todoUser, todoId) => {
    const todoCase = document.createElement("div");
    todoCase.className = "card__todo";

    const cardTop = document.createElement("div");
    cardTop.className = "card_top";

    const todoTitleHead = document.createElement("h3");
    todoTitleHead.className = "card__todo-title title4";
    const todoTitleText = document.createTextNode(todoTitle);

    const todoDate = document.createElement("div");
    const date = new Date().toLocaleTimeString();
    todoDate.className = "card__todo-title";

    const todoDescriptionCard = document.createElement("div");
    todoDescriptionCard.className = "todo-description";
    const todoDescriptionText = document.createTextNode(todoDescription);

    todoCase.append(cardTop);
    cardTop.append(todoTitleHead);
    todoTitleHead.append(todoTitleText);
    cardTop.append(todoDate);
    todoDate.append(date);
    todoDescriptionCard.append(todoDescriptionText);
    todoCase.append(todoDescriptionCard);

    const cardBottom = document.createElement("div");
    cardBottom.className = "card_bottom";

    const user = document.createElement("div");
    user.className = "user";

    const todoAuthor = document.createElement("img");
    todoAuthor.className = "card__todo-author";
    const imgAtr = document.createAttribute('src');
    imgAtr.value = todoImg;
    todoAuthor.setAttributeNode(imgAtr);

    const todoUserName = document.createElement("p");
    const todoUserNameText = document.createTextNode(todoUser);
    todoUserName.className = "todo__user-name";

    const cardEdit = document.createElement("div");
    cardEdit.className = "card__todo-buttons";

    const linkEdit = document.createElement("a");
    linkEdit.className = "card__todo-edit";
    const linkEditPicture = document.createElement("i");
    linkEditPicture.className = "edit icon";
    linkEditPicture.dataset.type = "edit-one";

    const linkDelete = document.createElement("a");
    linkDelete.className = "card__todo-delete";
    const linkDeletePicture = document.createElement("i");
    linkDeletePicture.className = "trash alternate icon";
    linkDeletePicture.dataset.type = 'delete-one';

    todoCase.append(cardBottom);
    cardBottom.append(user);
    user.append(todoAuthor);
    user.append(todoUserName);
    cardBottom.append(cardEdit);
    cardEdit.append(linkEdit);
    cardEdit.append(linkDelete);
    linkEdit.append(linkEditPicture);
    linkDelete.append(linkDeletePicture);
    todoUserName.append(todoUserNameText);

    todoCase.dataset.trelloId = todoId;
    todoCase.setAttribute('id', 'todo-id');

    return todoCase;
}
