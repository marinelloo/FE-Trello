// DragNDrop

let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function (el, target, source, sibling) {
    if (target === containerInProgress && target.children.length >= 6) {
        $('.ui.modal.pop-up__inprogress').modal({ blurring: true }).modal('show');
    }
});


//Add New card

let todos = [];

const TodoConstructor = function (todoTitle, todoDescription, todoImg, todoUser, todoId) {
    this.todoTitle = todoTitle;
    this.todoDescription = todoDescription;
    this.todoImg = todoImg;
    this.todoUser = todoUser;
    this.todoId = todoId;
}


//Create Todo
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

    const linkDelete = document.createElement("a");
    linkDelete.className = "card__todo-delete";
    const linkDeletePicture = document.createElement("i");
    linkDeletePicture.className = "trash alternate icon";

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

    todoCase.setAttribute('id', `${todoId}`);

    return todoCase;
}


//Get access
const approveBtn = document.getElementById("approveBtn");
const cardTodo = document.getElementById("todoCase");
const inputTitle = document.getElementById('inputTitle');
const inputDescription = document.getElementById('inputDescription');
const assignedPerson = document.getElementById('assignedPerson');

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
})

// Edit todo

