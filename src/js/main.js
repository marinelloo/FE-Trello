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


const storage = {
	getDataByKey: function (key) {
		if (localStorage.getItem(key) !== null) {
			return JSON.parse(localStorage.getItem(key));
		} else {
			return [];
		}
	},
	pushDataByKey: function (key, data) {
		let dataByKey = this.getDataByKey(key);
		dataByKey = [...dataByKey, data];
		localStorage.setItem(key, JSON.stringify(dataByKey));
	},
};

let todos =  [];

const inProgressColumn = document.querySelector('.dashboard__cards-inProgress');
const cardTodoColumn = document.querySelector('.dashboard__cards-todo');
const doneColumn = document.querySelector('.dashboard__cards-done');



const checkTodos = () => {
	const cards = storage.getDataByKey('cards');
	if (cards) {
		todos = [...todos, ...cards.map(card => new TodoConstructor(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn))];
	}
	for (const card of cards) {
		if (+card.todoColumn === +cardTodoColumn.dataset.columnId) {
			cardTodoColumn.append(createTodo(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
		} else if (+card.todoColumn === +inProgressColumn.dataset.columnId) {
			inProgressColumn.append(createTodo(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
		} else if (+card.todoColumn === +doneColumn.dataset.columnId) {
			doneColumn.append(createTodo(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
		}
	}

}

// DragNDrop

let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');
const root = document.getElementById('root');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function(el, target, source, sibling) {
   if (target === containerInProgress && target.children.length >= 6) {
      $('.ui.modal.pop-up__inprogress').modal({blurring: true}, {observeChanges: true}).modal('show')
   }
	for (const todo of todos) {
		if (+todo.todoId === +el.dataset.trelloId) {
			todo.todoColumn = target.dataset.columnId
		}
	}
	localStorage.setItem('cards', JSON.stringify(todos));
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

const TodoConstructor = function (todoTitle, todoDescription, todoImg, todoUser, todoId, todoColumn) {
	this.todoTitle = todoTitle;
	this.todoDescription = todoDescription;
	this.todoImg = todoImg;
	this.todoUser = todoUser;
	this.todoId = todoId;
	this.todoColumn = todoColumn;
}



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
	$('#modal_add').modal({ blurring: true }, { allowMultiple: true}).modal('show').modal({
		onApprove : function() {
			$('#form-add').submit();
			return false;
		}})

	let formSettings = {
			onSuccess : function()
			{
				$('.modal').modal('hide');
			}
	}
	$('#form-add').form(formSettings);
	$('.ui.dropdown').dropdown('restore defaults');
})


//Create trello card

approveBtn.addEventListener('click', () => {
	if (inputTitle.value === '' && inputDescription.value === ''){
		$('#form-add').form({
			fields: {
				title: 'empty',
				description: 'empty',
			},
		})
	} else if (inputTitle.value === '') {
		$('#form-add').form({
			fields: {
				title: 'empty',
			}
		})
	} else if (inputDescription.value === ''){
		$('#form-add').form({
			fields: {
				description: 'empty'
			}
		})
	} else {
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
		const column = "1";

		const todo = new TodoConstructor(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId, column);
		cardTodo.append(createTodo(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId, column));
		todos.push(todo);
		storage.pushDataByKey('cards', todo);
	}
})


// Pop ups

checkTodos();

let btnDeleteAll = document.querySelector('.btn__delete');
let btnDeleteConfirm = document.querySelector('.btn--dark');
let dashboardDone = document.querySelector('.dashboard__cards-done');


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

		$('#modal_edit').modal({blurring: true}, {allowMultiple: true}).modal('show').modal({
			onApprove : function() {
				$('#form-edit').submit();
				return false;
			}})
		let formSettings = {
			onSuccess : function()
			{
				$('#modal_edit').modal('hide');
			}
		}
		$('#form-edit').form(formSettings);

		$('.ui.dropdown').dropdown('set text', `<img class="ui mini avatar image" src= ${img}> ${clickedName}`)
		let elCurrent = document.querySelector(`[data-value = ${currentName}]`);
		let changedVal = elCurrent;

		$('#dropdown-edit').dropdown({
			'set value': `${clickedName}`,
			onChange: function (value1) {
				changedVal = value1;
				console.log(changedVal)
				return changedVal;
			}
		});

		inputTitle.value = clicked.querySelector('.card__todo-title').textContent;
		inputDescription.value = clicked.querySelector('.todo-description').textContent;

		let clickedImg = clicked.querySelector('.card__todo-author');
		let clickedUser = clicked.querySelector('.todo__user-name');

		editBtn.addEventListener('click', () => {
			if (inputTitle.value === '' && inputDescription.value === ''){
				$('#form-edit').form({
					fields: {
						title: 'empty',
						description: 'empty',
					},
				})
			} else if (inputTitle.value === '') {
				$('#form-edit').form({
					fields: {
						title: 'empty',
					}
				})
			} else if (inputDescription.value === ''){
				$('#form-edit').form({
					fields: {
						description: 'empty'
					}
				})
			} else {
				clicked.querySelector('.card__todo-title').textContent = inputTitle.value;
				clicked.querySelector('.todo-description').textContent = inputDescription.value;

				if (changedVal !== elCurrent) {
					let extractImg = document.querySelector(`[data-value = ${changedVal}]`);
					clickedImg.src = extractImg.querySelector('.ui.mini.avatar.image').src;
					clickedUser.textContent = extractImg.textContent;

				} else {
					clickedImg.src = elCurrent.querySelector('.ui.mini.avatar.image').src;
					clickedUser.textContent = elCurrent.textContent;
				}
				for (const todo of todos) {
					if (+todo.todoId === +clicked.dataset.trelloId) {
						todo.todoTitle = inputTitle.value;
						todo.todoDescription = inputDescription.value;
						todo.todoImg = clickedImg.src;
						todo.todoUser = clickedUser.textContent;
					}
				}
				localStorage.setItem('cards', JSON.stringify(todos));
			}
		})

	}
})


btnDeleteConfirm.addEventListener("click", (event) => {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
		todos = todos.filter(todo => +todo.todoColumn !== +doneColumn.dataset.columnId);
		dashboardDone.innerHTML = '';
		localStorage.setItem("cards", JSON.stringify(todos));
});

btnDeleteAll.addEventListener("click", (event) => {
	if (containerDone.children.length) {
		$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
	} else {
		return containerDone;
	}
})

