export {createTodo}

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
    cardEdit.className = "card__todo-btns";

    const linkEdit = document.createElement("a");
    linkEdit.className = "card__todo-edit";
    const linkEditPicture = document.createElement("i");
    linkEditPicture.className = "edit icon";
    linkEditPicture.dataset.type = 'edit-card';

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