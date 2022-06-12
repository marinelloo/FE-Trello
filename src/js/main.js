import {swiperMode} from './responsive.js'
import {createTodo} from './createCard.js'
import {randomNum, userAvatar, userAvatarEdit, userName} from './usersGenerate.js'


// on load
window.addEventListener('load', function() {
	swiperMode();
});

/* On Resize*/
window.addEventListener('resize', function() {
	swiperMode();
});

// Generate Avatars for modals
for (let i = 0; i < 6; i++) {
	userAvatar(i);
	userAvatarEdit(i)
}


// Generate user name for modals
let userArr = document.getElementById('menu').children;
let userArrEdit = document.getElementById('menu-edit').children;

userName().then(users => {
	let newArr = users.map(user => user.name);
	let data
	for (let i = 0; i < userArr.length; i++) {
			data = newArr[i].split(' ').join('_');
			if(data.includes('.')){
				data = data.split('.').join('_');
			}
			userArr[i].dataset.value = data;
			userArrEdit[i].dataset.value = data;
			userArr[i].append(newArr[i])
			userArrEdit[i].append(newArr[i])
	}
});


// DragNDrop

let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');
const root = document.getElementById('root');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function(el, target, source, sibling) {
   if (target === containerInProgress && target.children.length >= 6) {
      $('.ui.modal.pop-up__inprogress').modal({blurring: true}, {observeChanges: true}).modal('show');
   }
});


// Philippov drop
drake.on('drop', function(el, target, source, sibling) {
   if (target === containerInProgress && target.children.length >= 6) {
      $('.ui.modal.pop-up__inprogress').modal({blurring: true}, {observeChanges: true}).modal('show');
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
			}
		}
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
	$('#modal_add').modal({ blurring: true }, { allowMultiple: true}).modal('show');
	$('.ui.dropdown').dropdown();
})


const checkTodos = () => {
	const cards = storage.getDataByKey('cards');
	if (cards) {
		todos = [...todos, ...cards.map(card => new TodoConstructor(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId))];
	}
	for(let i = 0; i < todos.length; i++){
		cardTodo.append(createTodo(todos[i].todoTitle, todos[i].todoDescription, todos[i].todoImg, todos[i].todoUser, todos[i].todoId));
	}
}


//Create trello card

approveBtn.addEventListener('click', () => {
	const currentUser = $('#selection').dropdown('get value');
	let currentName = currentUser.split(' ').join('_');
	if(currentName.includes('.')){
		currentName = currentName.split('.').join('_');
	}
	const el = document.querySelector(`[data-value = ${currentName}]`);
	const userImage = el.firstChild;
	const imgAvatar = userImage.src;
	const todoUser = el.textContent;
	const todoId = Date.now();

	const todo = new TodoConstructor(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId);
	cardTodo.append(createTodo(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId));
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
			currentTrello.remove();
			localStorage.setItem("cards", JSON.stringify(todos));
		} else {
			localStorage.clear();
			trelloId.remove()
		}
	} if (event.target.dataset.type === 'edit-card') {
		const inputTitle = document.getElementById('title-edit');
		const inputDescription = document.getElementById('desc-edit');
		const editBtn = document.getElementById('editBtn');
		const clicked = event.target.closest('.card__todo');
		const clickedName = clicked.querySelector('.todo__user-name').textContent;
		let currentName = clickedName.split(' ').join('_');
		if(currentName.includes('.')){
			currentName = currentName.split('.').join('_');
		}

		let dropdownDefault = document.querySelector(`[data-value = ${currentName}]`).firstChild;
		let img = dropdownDefault.src

		$('#modal_edit').modal({blurring: true}, {allowMultiple: true}).modal('show');
		$('.ui.dropdown').dropdown('set text', `<img class="ui mini avatar image" src= ${img}> ${clickedName}`)
		let elCurrent = document.querySelector(`[data-value = ${currentName}]`);
		let changedVal = elCurrent;

		$('#dropdown-edit').dropdown({
			'set value': `${clickedName}`,
			onChange: function (value1) {
				changedVal = value1;
				return changedVal;
			}
		});

		inputTitle.value = clicked.querySelector('.card__todo-title').textContent;
		inputDescription.value = clicked.querySelector('.todo-description').textContent;

		let clickedImg = clicked.querySelector('.card__todo-author');
		let clickedUser = clicked.querySelector('.todo__user-name');

		editBtn.addEventListener('click', () => {
			clicked.querySelector('.card__todo-title').textContent = inputTitle.value;
			clicked.querySelector('.todo-description').textContent = inputDescription.value;

			if ( changedVal !== elCurrent) {
				let extractImg = document.querySelector(`[data-value = ${changedVal}]`);
				clickedImg.src = extractImg.querySelector('.ui.mini.avatar.image').src;
				clickedUser.textContent = extractImg.textContent;

			} else {
				clickedImg.src = elCurrent.querySelector('.ui.mini.avatar.image').src;
				clickedUser.textContent = elCurrent.textContent;
			}
			for (const todo of todos) {
				if (+todo.todoId === + clicked.dataset.trelloId) {
					todo.todoTitle = inputTitle.value;
					todo.todoDescription = inputDescription.value;
					todo.todoImg = clickedImg.src;
					todo.todoUser = clickedUser.textContent;
				}
			}
			localStorage.setItem('cards', JSON.stringify(todos));
		})

	}
})


btnDeleteConfirm.addEventListener("click", (event) => {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
		todos = [];
		dashboardDone.innerHTML = '';
		localStorage.setItem("cards", JSON.stringify(todos));
});

btnDeleteAll.addEventListener("click", (event) => {
	if (containerDone.children.length) {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
	} else {
		return containerDone;
	}
});



